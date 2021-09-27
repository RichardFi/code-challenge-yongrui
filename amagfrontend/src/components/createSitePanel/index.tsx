import { FunctionComponent, useState, SyntheticEvent, ChangeEvent } from 'react'
import { TabPanelProps } from '../../screens/siteScreen'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/core/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import { styled } from '@material-ui/core/styles'
import axios from 'axios'

const CreateSitePanel: FunctionComponent<TabPanelProps> = (
  props: TabPanelProps
) => {
  const { children, value, index, ...other } = props

  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post('http://localhost:5000/api/sites', {
        name,
        region,
        description,
        latitude,
        longitude
      })
      .then(response => {
        setShowAlertSuccess(true)
        setShowAlertError(false)
      })
      .catch(error => {
        setShowAlertSuccess(false)
        setShowAlertError(true)
      })
      .finally(() => setLoading(false))
  }

  const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleRegionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value)
  }

  const handleDescriptionOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleLatitudeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value)
  }

  const handleLongitudeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value)
  }
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={'create-site-panel'}
      aria-labelledby={'create-site-panel'}
      {...other}
    >
      <form onSubmit={handleSubmit}>
        <SaveButton variant='outlined' type='submit' disabled={loading}>
          {loading && <CircularProgress size={20} />}
          Create New Site
        </SaveButton>
        <FormTextField
          fullWidth
          id='name'
          label='Name'
          variant='outlined'
          onChange={handleNameOnChange}
        />
        <FormTextField
          fullWidth
          id='region'
          label='Jurisdiction/City/Region'
          variant='outlined'
          onChange={handleRegionOnChange}
        />
        <FormTextField
          fullWidth
          id='description'
          label='Site Description'
          variant='outlined'
          onChange={handleDescriptionOnChange}
        />
        <FormTextField
          id='latitude'
          label='Latitude'
          variant='outlined'
          onChange={handleLatitudeOnChange}
        />
        <FormTextField
          id='longitude'
          label='Longitude'
          variant='outlined'
          onChange={handleLongitudeOnChange}
        />
      </form>
      {showAlertSuccess && (
        <ResAlert severity='success'>Successfully created a new site</ResAlert>
      )}
      {showAlertError && <ResAlert severity='error'>Invalid inputs</ResAlert>}
    </div>
  )
}

const FormTextField = styled(TextField)({
  margin: '10px 20px'
})
const SaveButton = styled(Button)({
  margin: '15px 20px'
})

const ResAlert = styled(Alert)({
  margin: '10px 20px'
})

export default CreateSitePanel

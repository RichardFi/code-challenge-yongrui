import {
  FunctionComponent,
  useState,
  SyntheticEvent,
  ChangeEvent,
  useEffect
} from 'react'
import { TabPanelProps } from '../../screens/siteScreen'
import { styled } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/core/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import moment from 'moment'

export interface Site {
  name: string
  region: string
  description: string
  latitude: number
  longitude: number
  _id?: string
  update?: Date
}

const UpdateSitePanel: FunctionComponent<TabPanelProps> = (
  props: TabPanelProps
) => {
  const { children, value, index, ...other } = props

  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [update, setUpdate] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [id, setId] = useState('')

  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getNewSite = () => {
    axios.get('http://localhost:5000/api/sites').then(response => {
      try {
        const {
          name,
          region,
          description,
          latitude,
          longitude,
          _id,
          update
        } = response.data.sites[0]
        setName(name)
        setRegion(region)
        setDescription(description)
        setLatitude(latitude)
        setLongitude(longitude)
        setUpdate(update)
        setId(_id)
      } catch {}
    })
  }

  useEffect(() => {
    getNewSite()
    axios
    .get(`http://localhost:5000/api/sites/${id}/history`)
    .then(response => {
      if (response.data.length !== 0) {
        const { update } = response.data[0]
        setDateCreated(update)
      } else {
        setDateCreated(update)
      }
    })
  }, [id, update])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setShowAlertError(false)
    setShowAlertSuccess(false)
    axios
      .put(`http://localhost:5000/api/sites/${id}`, {
        name,
        region,
        description,
        latitude,
        longitude
      })
      .then(response => {
        setShowAlertSuccess(true)
        setShowAlertError(false)
        getNewSite()
      })
      .catch(error => {
        setShowAlertError(true)
        setShowAlertSuccess(false)
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
        <Text>Site id: {id}</Text>
        <SaveButton variant='outlined' type='submit' disabled={loading}>
          {loading && <CircularProgress size={20} />}
          Update Site
        </SaveButton>
        <FormTextField
          fullWidth
          id='name'
          label='Name'
          variant='outlined'
          onChange={handleNameOnChange}
          value={name}
        />
        <FormTextField
          fullWidth
          id='region'
          label='Jurisdiction/City/Region'
          variant='outlined'
          onChange={handleRegionOnChange}
          value={region}
        />
        <FormTextField
          fullWidth
          id='description'
          label='Site Description'
          variant='outlined'
          onChange={handleDescriptionOnChange}
          value={description}
        />
        <FormTextField
          id='latitude'
          label='Latitude'
          variant='outlined'
          onChange={handleLatitudeOnChange}
          value={latitude}
        />
        <FormTextField
          id='longitude'
          label='Longitude'
          variant='outlined'
          onChange={handleLongitudeOnChange}
          value={longitude}
        />
      </form>
      <Text>
        Date Created: {moment(dateCreated).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>
      <Text>
        Latest update: {moment(update).format('MMMM Do YYYY, h:mm:ss a')}
      </Text>

      {showAlertSuccess && (
        <ResAlert severity='success'>Successfully update the site</ResAlert>
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

const Text = styled(Typography)({
  margin: '10px 20px',
  font: '18px'
})

export default UpdateSitePanel

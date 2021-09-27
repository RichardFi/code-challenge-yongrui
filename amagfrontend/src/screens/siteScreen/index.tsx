import React, { useState, SyntheticEvent, useEffect } from 'react'
import { styled } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CreateSitePanel from '../../components/createSitePanel'
import UpdateSitePanel from '../../components/updateSitePanel'
import axios from 'axios'

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const SiteScreen = () => {
  const [value, setValue] = useState(0)
  const [noSite, setNoSite] = useState(true)
  useEffect(() => {
    axios.get('http://localhost:5000/api/sites').then(response => {
      const { sites } = response.data
      setNoSite(sites.length === 0)
    })
  }, [value])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '600px', margin: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Create a Site' />
          <Tab label='Update a Site' />
        </Tabs>
      </Box>
      <CreateSitePanel value={value} index={0} />
      {noSite ? (
        <Text hidden={value !== 1}>Please create a site first</Text>
      ) : (
        <UpdateSitePanel value={value} index={1} />
      )}
    </Box>
  )
}
const Text = styled(Typography)({
  margin: '10px 20px',
  font: '18px'
})
export default SiteScreen

import { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import Modal from "components/Modal/Modal"
import SignIn from "components/SignIn/SignIn"
import SignUp from "components/SignUp/SignUp"

import "./Authentication.sass"

function CenteredTabs() {
  const [value, setValue] = useState("1")

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange} centered className='tabs'>
          <Tab label="Sign In" value="1"/>
          <Tab label="Sign Up" value="2"/>
        </Tabs>
        <TabPanel value="1">
          <SignIn />
        </TabPanel>
        <TabPanel value="2">
          <SignUp />
        </TabPanel>
      </TabContext>
    </Box>
  )
}



const Authentication = () => {
  return (
    <Modal className="authentication-modal-container">
      <>
        <CenteredTabs />
      </>
    </Modal>
  )
}

export default Authentication
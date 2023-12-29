import { useState } from "react"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Wc from "@mui/icons-material/Wc"
import Tty from "@mui/icons-material/Tty"
import Button from "@mui/material/Button"
import Lock from "@mui/icons-material/Lock"
import TextField from "@mui/material/TextField"
import Person from "@mui/icons-material/Person"
import CalendarToday from "@mui/icons-material/CalendarToday"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



import './SignUp.sass'

const SignUp = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <Card className="sign-card-container">
      <Box>
        <Person />
        <TextField id="input-username" label="Username" type="text" variant="standard" />
      </Box>
      <Box>
        <Tty />
        <TextField id="input-username" label="Telephone number" type="text" variant="standard" />
      </Box>
      <Box>
        <CalendarToday />
        <FormControl variant="standard">
          <InputLabel id="sign-up-age-label">Age</InputLabel>
          <Select
            labelId="sign-up-age-label"
            id="sign-up-age"
            value={age}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="0 - 17">0 - 17</MenuItem>
            <MenuItem value="17 - 30">17 - 30</MenuItem>
            <MenuItem value="30 - 40">30 - 40</MenuItem>
            <MenuItem value="40 - 50">40 - 50</MenuItem>
            <MenuItem value="50 - *">50 - *</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Wc />
        <FormControl variant="standard">
          <InputLabel id="sign-up-gender-label">Gender</InputLabel>
          <Select
            labelId="sign-up-gender-label"
            id="sign-up-gender"
            value={gender}
            onChange={handleChangeGender}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="secret">Prefer not to say</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Lock />
        <TextField id="input-password" label="Password" variant="standard" type="password" />
      </Box>
      <span className="password-hint">Your password must contain letters, numbers, uppercase characters, and no special characters. It should have a minimum length of 8 and a maximum length of 12.</span>
      <Button>Sign Up</Button>
    </Card>
  )
}

export default SignUp

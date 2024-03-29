import { useState, useContext, useEffect } from 'react'

import { AuthContext } from 'context/authContext';

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

const applyPhoneMask = (value) => {
   const numericValue = value.replace(/\D/g, '');
   const limitedValue = numericValue.slice(0, 8);
   const maskedValue = limitedValue.replace(/(\d{4})(\d{0,4})/, '$1-$2');
   
   return maskedValue;
}

const isPasswordValid = (password) => {
  const containsLettersNumbers = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password);
  const noSpecialCharacters = /^[a-zA-Z0-9]+$/.test(password);
  const isLengthValid = password.length >= 8 && password.length <= 12;

  return containsLettersNumbers && noSpecialCharacters && isLengthValid;
}


const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [age, setAge] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [validPassword, setValidPassword] = useState(true)
  const [enableSignUp, setEnableSignUp] = useState(false)

  const { register } = useContext(AuthContext)

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  
  const handleChangePhone = (e) => {
    const newValue = applyPhoneMask(e.target.value);
    setPhone(newValue);
  };

  const handleChangePassword = (e) => {
    const isValid = isPasswordValid(e.target.value)

    setPassword(e.target.value)
    setValidPassword(isValid)
  }

  const callToSignUp = () => {
    if (username && validPassword && phone && gender) {
      register({ username, password, age, phone, gender })
    }
    else {
      alert('Please fill all required fields')
      console.error('Please fill all required fields')
    }
  }

  useEffect(() => {
    if (username && validPassword && phone && gender) {
      setEnableSignUp(true)
    } else {
      setEnableSignUp(false)
    }
  }, [username, validPassword, phone, gender])

  return (
    <Card elevation={0} className="sign-card-container">
      <Box>
        <Person />
        <TextField id="input-username" label="Username *" type="text" variant="filled" onChange={(e) => setUsername(e.target.value)} />
      </Box>
      <Box>
        <Tty />
        <TextField placeholder='8888-8888' id="input-telephone" label="Telephone number *" type="text" variant="filled" value={phone} onChange={handleChangePhone} />
      </Box>
      <Box>
        <CalendarToday />
        <FormControl variant="filled">
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
        <FormControl variant="filled">
          <InputLabel id="sign-up-gender-label">Gender *</InputLabel>
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
      <Box className="password-box">
        <Lock style={{color: validPassword ? 'green' : 'inherit' }} />
        <TextField className="password-field" error={!validPassword} id="input-password" label="Password *" variant="filled" type="password" onChange={handleChangePassword} />
      </Box>
      <p className="password-hint" style={{color: validPassword ? 'inherit' : 'red' }}>Your password must contain letters, numbers, uppercase characters, and no special characters. It should have a minimum length of 8 and a maximum length of 12.</p>

      <p className="hint">* Obligatory fields</p>
      <Button disabled={!enableSignUp} onClick={callToSignUp}>Sign Up</Button>
    </Card>
  )
}

export default SignUp

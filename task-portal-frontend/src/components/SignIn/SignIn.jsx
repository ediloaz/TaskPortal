import { useEffect, useState, useContext } from "react";

import { AuthContext } from 'context/authContext';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Lock from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Person from "@mui/icons-material/Person";

import './SignIn.sass'

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [displayWelcome, setDisplayWelcome] = useState(false)

  const { isLogged, login } = useContext(AuthContext)

  console.log('isLogged', isLogged)

  const callToSignIn = () => {
    login(username, password)
  }

  useEffect(() => {
    if (isLogged) {
      // setDisplayWelcome(true)
      // setTimeout(() => {
      //   setDisplayWelcome(false)
      // }, 2000)
    }
  }, [isLogged])

  return (
    <Card className="sign-card-container">
      <Box>
        <Person />
        <TextField id="input-username" label="Username" type="text" variant="standard" onChange={(e) => setUsername(e.target.value)} />
      </Box>
      <Box>
        <Lock />
        <TextField id="input-password" label="Password" variant="standard" type="password" onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button onClick={callToSignIn}>Sign In</Button>
      <span>{displayWelcome ? `Bienvenido ${username}` : ''}</span>
    </Card>
  );
};

export default SignIn;

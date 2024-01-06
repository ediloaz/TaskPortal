import { useState, useContext } from "react";

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

  const { login } = useContext(AuthContext)

  const callToSignIn = () => {
    login(username, password)
  }

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
    </Card>
  );
};

export default SignIn;

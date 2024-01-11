import { useState, useContext } from "react";

import { AuthContext } from 'context/authContext';

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';
import Button from "@mui/material/Button";
import Lock from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Person from "@mui/icons-material/Person";

import './SignIn.sass'

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const { login } = useContext(AuthContext)

  const callToSignIn = async () => {
    const isSigned = await login(username, password)

    if (isSigned) setError(false)
    else setError(true)
  }

  return (
    <Card elevation={0} className="sign-card-container">
      <Box>
        <Person />
        <TextField id="input-username" label="Username" type="text" variant="filled" onChange={(e) => setUsername(e.target.value)} />
      </Box>
      <Box>
        <Lock />
        <TextField id="input-password" label="Password" variant="filled" type="password" onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button onClick={callToSignIn}>Sign In</Button>
      {error &&
        <Alert className="alertError" severity="error"><b>Incorrect data to login</b>, check your console for more details.</Alert>
      }
    </Card>
  );
};

export default SignIn;

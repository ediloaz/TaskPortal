import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Person from "@mui/icons-material/Person";
import Lock from "@mui/icons-material/Lock";

import './SignIn.sass'

const SignIn = () => {
  return (
    <Card className="sign-card-container">
      <Box>
        <Person />
        <TextField id="input-username" label="Username" type="text" variant="standard" />
      </Box>
      <Box>
        <Lock />
        <TextField id="input-password" label="Password" variant="standard" type="password" />
      </Box>
      <Button>Sign In</Button>
    </Card>
  );
};

export default SignIn;

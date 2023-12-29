import CardMui from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import './Card.sass'

const Card = ({ title, description, user }) => {
  return (
    <CardMui className="card-container">
      <CardContent>
        title: {title}, description: {description}, user: {user}
      </CardContent>
      <CardActions>
        <Button size="medium">Ver más</Button>
      </CardActions>
    </CardMui>
  )
}

export default Card
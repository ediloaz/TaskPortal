import CardMui from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import './Card.sass'

const Card = ({ title, description, user }) => {
  return (
    <CardMui className="card-container">
      <CardContent>
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </CardContent>
      <CardActions>
        <Button size="medium">Ver más</Button>
      </CardActions>
    </CardMui>
  )
}

export default Card
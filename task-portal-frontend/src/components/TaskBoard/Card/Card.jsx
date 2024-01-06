import CardMui from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CloudUpload from '@mui/icons-material/CloudUpload';

import './Card.sass'

const Card = (props) => {
  const { title, description } = props

  return (
    <CardMui className="card-container">
      <CardContent>
        <p className="card-title">{title}</p>
        <p className="card-description">{description}</p>
      </CardContent>
      <CardActions className='card-actions'>
        <Button startIcon={<CloudUpload />} variant='outlined' size="small">Upload image</Button>
      </CardActions>
    </CardMui>
  )
}

export default Card
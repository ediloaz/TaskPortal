import { useState } from 'react'
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from 'react-advanced-cropper';
import { updateImageCard } from 'helpers/cards'

import CardMui from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CloudUpload from '@mui/icons-material/CloudUpload';

import Modal from 'components/Modal/Modal'

import './Card.sass'

const Card = (props) => {
  const { id, title, description } = props
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(props?.image)
  const [cropped, setCropped] = useState(props?.image)

  const updateCardImage = () => {
    updateImageCard(id, cropped)
    handleClose()
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onMoveEnd = (event) => {
    const newImage = event.getCanvas()?.toDataURL()
    if (newImage) setCropped(newImage)
  }

  const uploadImage = (event, id) => {
    console.log(event);
    var file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend = function(e) {
      const newImage = reader.result
      if (newImage) setImage(newImage)
    }.bind(this);

    handleOpen()
  }

  return (
    <>
      <Modal isOpen={open} onClose={handleClose}>
        <h2>Upload image</h2>
        <FixedCropper
          onMoveEnd={onMoveEnd}
          src={image}
          stencilSize={{
              width: 300,
              height: 300
          }}
          stencilProps={{
              handlers: true,
              lines: true,
              movable: true,
              resizable: true
          }}
          imageRestriction={ImageRestriction.stencil}
        />
        <Button onClick={updateCardImage} variant='outlined' size="small">Set image</Button>
      </Modal>

      <CardMui className="card-container">
        <CardContent>
          <p className="card-title">{title}</p>
          {(cropped || image) && (
            <img src={cropped || image} alt="cropped" width={200} height={200} />
          )}
          <p className="card-description">{description}</p>
        </CardContent>
        <CardActions className='card-actions'>
          <label htmlFor={`${id}-contained-button-file`}>
            <Button startIcon={<CloudUpload />} variant="outlined" component="span">
              Upload Image
              <input
                id={`${id}-contained-button-file`}
                accept="image/*"
                type="file"
                onChange={uploadImage}
                style={{display: 'none'}}
              />
            </Button>
          </label>
        </CardActions>
      </CardMui>
    </>
  )
}

export default Card
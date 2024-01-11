import { useState } from 'react'
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from 'react-advanced-cropper';

import CardMui from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CloudUpload from '@mui/icons-material/CloudUpload';

import Modal from 'components/Modal/Modal'

import './Card.sass'

const MOCKUP_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAAXNSR0IArs4c6QAAAFBJREFUGFdjfJ46+z8DDsD4PAWv5CzcOp8lTUeSZGRgZATZwQhBj+MmwyUZmUCSTAyMjBBFjA9jJiJ0MjIyMIEloPh+dP9/Bqg0SBBsKFQSAAunFSOipkHdAAAAAElFTkSuQmCC"

const Card = (props) => {
  const { id, title, description, updateImageCard } = props

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
    if (newImage) {
      setCropped(newImage)
    }
  }

  const uploadImage = (event, id) => {
    try {
      var file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file)
  
      reader.onloadend = function(e) {
        const newImage = reader.result

        if (newImage) {
          setImage(newImage)
          setCropped(newImage)
          updateImageCard(id, newImage)
        }
      }.bind(this);
  
      handleOpen()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Modal isOpen={open} onClose={updateCardImage} className='modal-container-upload-image'>
        <h2>Upload image</h2>
        <FixedCropper
          onResizeEnd={onMoveEnd}
          onMoveEnd={onMoveEnd}
          src={image || MOCKUP_IMAGE}
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
        <Button className='setImageButton' onClick={updateCardImage} variant='outlined' size="large">Set image</Button>
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
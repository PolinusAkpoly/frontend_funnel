/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/04/2024 16:42:37
*/
import React, { FC, useEffect } from 'react';
import './ChangeImageCarouselModal.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fileToDataURL } from '../../helpers/utiles';

interface ChangeImageCarouselModalProps {
 show: boolean
 closeChangeImageCarouselModal: ()=>void
 updateDataStorage(imageUrl: string): void
}


const ChangeImageCarouselModal : FC<ChangeImageCarouselModalProps> = ({show, closeChangeImageCarouselModal, updateDataStorage}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

const updateImage = async (event: any) =>{
  event.preventDefault()
  const files = event.target.files;
  if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = await fileToDataURL(file)
      // console.log(imageUrl);
      updateDataStorage(imageUrl)
  }


}



  return (
      <Modal show={show} onHide={closeChangeImageCarouselModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" name='file' onChange={(event)=>updateImage(event)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeChangeImageCarouselModal}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
  );
}

export default ChangeImageCarouselModal;
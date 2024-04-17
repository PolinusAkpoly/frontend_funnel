/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/02/2024 11:50:55
*/
import React, { useState } from 'react';
import { Modal,  } from 'react-bootstrap';

interface ImagePreviewProps {
  imageUrl: string;
  altText: string;
  width?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl,width, altText }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img
        src={imageUrl}
        alt={altText}
        width={width}
        onClick={handleShow}
        style={{ cursor: 'pointer' }}
      />

      <Modal show={show} centered size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Image Preview</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <img src={imageUrl} alt={altText} style={{ width: '100%' }} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ImagePreview;

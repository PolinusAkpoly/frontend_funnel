/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/02/2024 13:28:31
*/
import React, { FC } from 'react';
import { Modal } from 'react-bootstrap';
import './PreviewModal.css';

interface PreviewModalProps {
  show: boolean;
  onHide: () => void;
  websiteUrl: string;
}

const PreviewModal: FC<PreviewModalProps> = ({ show, onHide, websiteUrl }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered style={{ height: '90vh'}} >
      <Modal.Header closeButton>
        {/* <Modal.Title>Preview Website</Modal.Title> */}
      </Modal.Header>
      <Modal.Body >
        <iframe src={websiteUrl} title="Preview" width="100%" height="500px" frameBorder="0" />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default PreviewModal;

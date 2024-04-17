/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/02/2024 14:48:00
*/
import React  from 'react';
import { Modal } from 'react-bootstrap';
import FileDrop from '../FileDrop/FileDrop';

interface FileDropModalProps {
  showModal: boolean;
  onClose: () => void;
  onFilesDrop: (files: FileList) => void;
}

const FileDropModal: React.FC<FileDropModalProps> = ({ showModal, onClose, onFilesDrop }) => {
  const handleHide = () => {
    onClose();
  };

  return (
    <Modal className='FileDropModal' show={showModal} onHide={handleHide} size='xl' centered>
      {/* <Modal.Header closeButton>
        <Modal.Title>Glisser-Déposer des Fichiers</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <FileDrop 
        onFilesDrop={onFilesDrop} 
        />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Fermer
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default FileDropModal;

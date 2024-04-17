/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/02/2024 20:40:39
*/
import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { getDatasByUserId } from '../../api/api-entity';
import NewPagination from '../NewPagination/NewPagination';
import { cleanLink } from '../../helpers/utiles';

interface FileStorageModalProps {
  show: boolean;
  type?: string;
  onHide: () => void;
  handleSelectFile?: (link: string) => void;
}

interface FileData {
  name: string;
  link: string;
  type: string;
}

const FileStorageModal: React.FC<FileStorageModalProps> = ({ show, type, onHide, handleSelectFile }) => {
  const [files, setFiles] = useState<FileData[] | undefined>();


  useEffect(() => {
    // Effectuer la requête API pour récupérer la liste des fichiers

  }, []); // Utilisation d'un tableau vide pour s'assurer que cela ne se déclenche qu'une seule fois au montage

  const handleChooseFile = (file: any) => {
    if (handleSelectFile) {
      handleSelectFile(cleanLink(file.link))
    }
  }



  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Files lists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="data-pagination">

          <NewPagination
            entityName="filestorage"
            filter={type ? "&type=" + type.toLowerCase() : ''}
            action={getDatasByUserId}
            handleChange={(data) => setFiles(data)}
          />
        </div>
        {files && files?.length > 0 ? (
          <>
            <Row>
              {files?.map((file, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                  <div className="file-card p-1 card">
                    {file.type.startsWith('image/') ? (
                      <img
                        onClick={() => handleChooseFile(file)}
                        src={file.link} alt={file.name} style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : file.type.startsWith('video/') ? (
                      <video
                        onClick={() => handleChooseFile(file)}
                        width="100%" height="100%"
                      >
                        <source src={file.link} type={file.type} />
                        Your browser does not support the video tag.
                      </video>
                    ) : file.type.startsWith('audio/') ? (
                      <div onClick={() => handleChooseFile(file)} style={{ width: '100%', height: '100%' }}>
                        <span>
                          <strong> Audio  : </strong>
                          ({file.name}) </span>
                        {/* <audio controls>
                          <source src={file.link} type={file.type} />
                          Your browser does not support the audio tag.
                        </audio> */}
                      </div>
                    ) : file.type.startsWith('application/pdf') ? (
                      <div onClick={() => handleChooseFile(file)} style={{height:"250"}}>
                        <span>PDF ({file.name}) </span>
                        {/* <embed
                          src={file.link}
                          type="application/pdf"
                          width="100%"
                          height="500px"
                        /> */}
                      </div>
                    ) : file.type.startsWith('application/json') ? (
                      <p onClick={() => handleChooseFile(file)}>JSON File: {file.name}</p>
                    ) : file.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ? (
                      <p onClick={() => handleChooseFile(file)}>DOCX File: {file.name}</p>
                    ) : (
                      <p>Type: {file.type}</p>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p>Aucun fichier disponible.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FileStorageModal;

/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/02/2024 20:40:22
*/
import React, { FC, useEffect } from 'react';
import './FileModal.css';


interface FileModalProps {
 
}


const FileModal : FC<FileModalProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="FileModal">
          FileModal Component
      </div>
  );
}

export default FileModal;
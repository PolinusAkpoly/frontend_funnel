/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 15/02/2024 14:47:05
*/
import React, { useState, DragEvent, ChangeEvent, useRef } from 'react';
import './FileDrop.css';

interface FileDropProps {
  onFilesDrop: (files: FileList) => void;
}

const FileDrop: React.FC<FileDropProps> = ({ onFilesDrop }) => {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const { files } = e.dataTransfer;
    onFilesDrop(files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      onFilesDrop(files);
    }
  };

  const handleFileDropClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`file-drop ${dragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleFileDropClick}
    >
      <p>
        {dragging ? 'Relâchez pour déposer les fichiers' : 'Cliquez ou glissez-déposez des fichiers ici'}
      </p>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        multiple
      />
    </div>
  );
};

export default FileDrop;


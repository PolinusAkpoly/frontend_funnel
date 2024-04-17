/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/02/2024 12:10:41
*/
// src/components/ComponentList.tsx
import React from 'react';

interface ComponentListProps {
  handleDrop: (componentType: string) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({ handleDrop }) => {
  
  const components = [
    { type: 'title', label: 'Titre' },
    { type: 'paragraph', label: 'Paragraphe' },
    { type: 'image', label: 'Image' },
    { type: 'video', label: 'Vidéo' },
    // Ajoutez d'autres types de composants ici
  ];

  const handleDragStart = (event: React.DragEvent, componentType: string) => {
    event.dataTransfer.setData('text/plain', componentType);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const renderComponents = () => {
    return components.map((component) => (
      <div
        key={component.type}
        draggable={true}
        onDragStart={(event) => handleDragStart(event, component.type)}
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(component.type)}
        style={{ margin: '5px', padding: '10px', border: '1px solid #ccc', cursor: 'move' }}
      >
        {component.label}
      </div>
    ));
  };

  return (
    <div>
      <h4>Composants disponibles :</h4>
      {renderComponents()}
    </div>
  );
};

export default ComponentList;

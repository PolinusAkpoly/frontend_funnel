/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/02/2024 11:42:42
*/
// src/components/SiteBuilder.tsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const SiteBuilder: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        {/* Première colonne - Liste des composants */}
        <div style={{ flex: '1 0 30%' }}>
          composant
        </div>
        {/* Deuxième colonne - Éditeur de template */}
        <div style={{ flex: '1 0 70%' }}>
          site Web
        </div>
      </div>
    </DndProvider>
  );
};

export default SiteBuilder;

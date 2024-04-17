/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/02/2024 09:11:25
*/
import React, { FC, useEffect, useState } from 'react';
import './ColorModal.css';
import GradientColorPicker from '../GradientColorPicker/GradientColorPicker';

interface ColorModalProps {
  localParams: any; // Ajout d'un point d'interrogation pour rendre la propriété facultative
  property: string;
  top?: number;
  action: (params: { property: string }) => void;
}

const ColorModal: FC<ColorModalProps> = ({ localParams,property,top, action }) => {
  const [colorModal, setColorModal] = useState<boolean>(false);

  useEffect(() => {
    // Ajout d'une fonction de nettoyage pour l'effet secondaire
    return () => {
      // Code de nettoyage ici, si nécessaire
    };
  }, []); // Ajout d'un tableau de dépendances vide pour exécuter l'effet uniquement une fois au montage

  const handleAction = (color: string) =>{
    const result: any = {}
    result[property] = color 
    console.log(result);
    
    action(result)
  }

  return (
    <div className="ColorModal" style={top ? {top: top+'px'} : {}}>
      <form>
        <label htmlFor={property}>Color :</label>
        <div
          onClick={() => setColorModal(!colorModal)}
          className="color"
          style={{width: '50px',height: '30px', background: localParams[property] || 'orange' }}
        ></div>
        {colorModal && (
          <div className="position-relative">
            <div className="color-selector">
              <GradientColorPicker
                onChange={handleAction}
                handleClose={() => setColorModal(!colorModal)}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ColorModal;

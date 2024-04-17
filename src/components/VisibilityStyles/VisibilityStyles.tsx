/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/02/2024 09:22:37
*/
import React, { FC } from 'react';
import './VisibilityStyles.css'; // Assurez-vous d'ajouter les styles nécessaires

interface VisibilityStylesProps {
  localParams: any;
  handleParamChange: (property: string, value: any) => void;
  handleParamManyChange: (data: Record<string, string>) => void;
}

const VisibilityStyles: FC<VisibilityStylesProps> = ({ localParams,handleParamChange }) => {
 



  return (
    <div className="VisibilityStyles">
      <form>
        <label htmlFor="isVisible">Visibilité :</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => handleParamChange('visibility', e.target.checked ? 'visible' : 'hidden' )}
            defaultChecked={localParams?.isVisible || false}
          />
          Visible
        </div>
      </form>

      <form>
        <label htmlFor="opacity">Opacité :</label>
        <input
          type="range"
          id="opacity"
          min="0"
          max="1"
          step="0.1"
          value={localParams?.opacity || 1}
          onChange={(e) => handleParamChange('opacity', e.target.value )}
        />
        <span>{localParams?.opacity || 1}</span>
      </form>

      {/* Ajoutez ici d'autres champs ou options spécifiques à la visibilité */}

    </div>
  );
};

export default VisibilityStyles;

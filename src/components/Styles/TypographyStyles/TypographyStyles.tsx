/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './TypographyStyles.css';
import ColorModal from '../../ColorModal/ColorModal';


interface TypographyStylesProps {
  localParams: any
  handleParamChange: (property: string, value: any) => void,
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const TypographyStyles: FC<TypographyStylesProps> = ({ localParams, handleParamChange }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="TypographyStyles">
     
      <ColorModal
        localParams={localParams}
        property='color'
        top={550}
        action={(data: any) => handleParamChange('color', data['color' as any])}
      />
      <form>
        <label htmlFor="fontStyle">Style du texte :</label>
        <select className='form-control'
          id="fontStyle"
          value={localParams?.fontStyle || ''}
          onChange={(e) => handleParamChange('fontStyle', e.target.value)}
        >
          <option value="" disabled>
            Sélectionnez un style
          </option>
          <option value="normal">Normal</option>
          <option value="italic">Italique</option>
          <option value="oblique">Oblique</option>
          <option value="bold">Gras</option> 
          {/* Ajoutez d'autres options selon vos besoins */}
        </select>
      </form>
      <form className='d-flex gap-1'>
        <label htmlFor="fontSize">Taille Police :</label>
        <input
          type="range"
          min={0}
          max={500}
          id="fontSize"
          value={localParams?.fontSize || ''}
          onChange={(e) => handleParamChange('fontSize', Number(e.target.value))}
        />
        <input
          type="number"
          id="fontSize"
          value={localParams?.fontSize || ''}
          onChange={(e) => handleParamChange('fontSize', Number(e.target.value))}
        />
      </form>
      <form>
        <label htmlFor="fontFamily">Police :</label>
        <select
          id="fontFamily"
          value={localParams?.fontFamily || ''}
          onChange={(e) => handleParamChange('fontFamily', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Times New Roman, serif">Times New Roman</option>
          {/* Ajoutez d'autres options pour d'autres polices si nécessaire */}
        </select>
      </form>
      <form>
        <label htmlFor="textAlign">Horizontal:</label>
        <select
          id="textAlign"
          value={localParams?.textAlign || ''}
          onChange={(e) => handleParamChange('textAlign', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="left">À gauche</option>
          <option value="center">Au centre</option>
          <option value="right">À droite</option>
          <option value="justify">A Jutifier</option>
        </select>
      </form>

      <form>
        <label htmlFor="verticalAlign">Vertical :</label>
        <select
          id="verticalAlign"
          value={localParams?.verticalAlign || ''}
          onChange={(e) => handleParamChange('verticalAlign', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="top">En haut</option>
          <option value="middle">Au milieu</option>
          <option value="bottom">En bas</option>
        </select>
      </form>
    </div>
  );
}

export default TypographyStyles;
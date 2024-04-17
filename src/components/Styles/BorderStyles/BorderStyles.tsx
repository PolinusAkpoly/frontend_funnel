/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './BorderStyles.css';
import ColorModal from '../../ColorModal/ColorModal';


interface BorderStylesProps {
  localParams: any
  handleParamChange: (property: string, value: any) => void,
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const BorderStyles: FC<BorderStylesProps> = ({ localParams, handleParamChange }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="BorderStyles">

      <form>
        <label htmlFor="borderRadius">Radius:</label>
        <input
          type="range"
          min={0}
          max={100}
          id="borderRadiusRange"
          value={String(localParams?.borderRadius).split('px')[0] || ''}
          onChange={(e) => handleParamChange('borderRadius', e.target.value + 'px')}
        />
        <input
          type="number"
          id="borderRadiusNumber"
          value={String(localParams?.borderRadius).split('px')[0] || ''}
          onChange={(e) => handleParamChange('borderRadius', e.target.value + 'px')}
        />
      </form>
      <form>
        <label htmlFor="borderWidth">Width :</label>
        <input
          type="range"
          min={0}
          max={100}
          id="borderWidth"
          value={String(localParams?.borderWidth).split('px')[0] || ''}
          onChange={(e) => handleParamChange('borderWidth', e.target.value + 'px')}
        />
        <input
          type="number"
          id="borderWidth"
          value={String(localParams?.borderWidth).split('px')[0] || ''}
          onChange={(e) => handleParamChange('borderWidth', e.target.value + 'px')}
        />
      </form>
      <form>
        <label htmlFor="borderStyle">Style :</label>
        <select
          id="borderStyle"
          value={localParams?.borderStyle || ''}
          onChange={(e) => handleParamChange('borderStyle', e.target.value)}
        >
          <option value="" disabled={true}>Choose border</option>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
          <option value="ridge">Ridge</option>
          <option value="inset">Inset</option>
          <option value="outset">Outset</option>

        </select>
      </form>
   
      <ColorModal
        localParams={localParams}
        property='borderColor'
        action={(data: any) => handleParamChange('borderColor', data['borderColor' as any])}
      />
    </div>

  );
}

export default BorderStyles;
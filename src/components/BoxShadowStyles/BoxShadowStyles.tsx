/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/02/2024 11:13:00
*/
import React, { FC } from 'react';
import './BoxShadowStyles.css';
import ColorModal from '../ColorModal/ColorModal';


interface BoxShadowStylesProps {
  localParams: any,
  handleParamChange: (property: string, value: any) => void,
  handleParamManyChange: (data: Record<string, string>) => void,
}

const BoxShadowStyles: FC<BoxShadowStylesProps> = ({ localParams, handleParamChange, handleParamManyChange }) => {


  // Construire boxShadowValue avant chaque appel à handleParamChange
  const updateBoxShadow = (changes: Partial<typeof localParams>) => {
    const updatedParams = { ...localParams, ...changes };
    updatedParams.boxShadow = `${updatedParams?.boxShadowX || 0}px ${updatedParams?.boxShadowY || 0}px ${updatedParams?.boxShadowBlur || 0}px ${updatedParams?.boxShadowSpread || 0}px ${updatedParams?.boxShadowColor || 'orange'}`;
    handleParamManyChange(updatedParams)
  };

  return (
    <div className="BoxShadowStyles">
      <form>
        <label htmlFor="boxShadow">Ombre de la boîte :</label>
        <div className="form-check form-switch">

          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => handleParamChange('boxShadow', e.target.checked ? 'unset' : '')}
            defaultChecked={localParams?.boxShadow === 'unset'}
          />
          No
        </div>
      </form>

      {localParams?.boxShadow !== 'unset' && (
        <>
          <ColorModal
            localParams={localParams}
            property='boxShadowColor'
            action={updateBoxShadow}
          />
          <form>
            <label htmlFor="boxShadowX">Décalage X :</label>
            <input
              type="range"
              min={0}
              value={localParams?.boxShadowX || 0}
              onChange={(e) => updateBoxShadow({ boxShadowX: e.target.value })}
            />
            <input
              type="number"
              id="boxShadowX"
              value={localParams?.boxShadowX || 0}
              onChange={(e) => updateBoxShadow({ boxShadowX: e.target.value })}
            />
          </form>

          <form>
            <label htmlFor="boxShadowY">Décalage Y :</label>
            <input
              type="range"
              min={0}
              value={localParams?.boxShadowY || 0}
              onChange={(e) => updateBoxShadow({ boxShadowY: e.target.value })}
            />
            <input
              type="number"
              id="boxShadowY"
              value={localParams?.boxShadowY || 0}
              onChange={(e) => updateBoxShadow({ boxShadowY: e.target.value })}
            />
          </form>

          <form>
            <label htmlFor="boxShadowBlur">Flou :</label>
            <input
              type="range"
              min={0}
              value={localParams?.boxShadowBlur || 0}
              onChange={(e) => updateBoxShadow({ boxShadowBlur: e.target.value })}
            />
            <input
              type="number"
              id="boxShadowBlur"
              defaultValue={localParams?.boxShadowBlur || 0}
              onChange={(e) => updateBoxShadow({ boxShadowBlur: e.target.value })}
            />
          </form>

          <form>
            <label htmlFor="boxShadowSpread">Étendue :</label>
            <input
              type="range"
              min={0}
              value={localParams?.boxShadowSpread || 0}
              onChange={(e) => updateBoxShadow({ boxShadowSpread: e.target.value })}
            />
            <input
              type="number"
              id="boxShadowSpread"
              value={localParams?.boxShadowSpread || 0}
              onChange={(e) => updateBoxShadow({ boxShadowSpread: e.target.value })}
            />
          </form>


        </>
      )}

    </div>
  );
}

export default BoxShadowStyles;

/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './BoxModelStyles.css';


interface BoxModelStylesProps {
  localParams: any
  handleParamChange: (property: string, value: any) => void,
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const BoxModelStyles: FC<BoxModelStylesProps> = ({ localParams, handleParamChange, handleSubParamChange }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="BoxModelStyles">
      <form>
        <label htmlFor="width">Largeur (px):</label>
        <div className='d-flex align-items-center gap-1'>
          <span>
            Auto
          </span>
          <input
            type="checkbox"
            checked={localParams?.width === 'auto'}
            onChange={(e) => handleParamChange('width', e.target.checked ? 'auto' : '')}
          />

        </div>
        <input
          type="number"
          id="width"
          value={localParams?.width || ''}
          onChange={(e) => handleParamChange('width', Number(e.target.value))}
        />
      </form>
      <form>
        <label htmlFor="width">Largeur (%):</label>
        <input
          type="range"
          id="width"
          min={0}
          max={100}
          value={String(localParams?.width)?.split('%')[0] || ''}
          onChange={(e) => handleParamChange('width', Number(e.target.value) + '%')}
        />
        {String(localParams?.width)?.includes('%') && String(localParams?.width)}
      </form>
      <form>
        <label htmlFor="width">Largeur (vw):</label>
        <input
          type="range"
          id="width"
          min={0}
          max={100}
          value={String(localParams?.width)?.split('vw')[0] || ''}
          onChange={(e) => handleParamChange('width', Number(e.target.value) + 'vw')}
        />
        {String(localParams?.width)?.includes('vw') && String(localParams?.width)}
      </form>

      <form>
        <label htmlFor="height">Hauteur :</label>
        <div className='d-flex align-items-center gap-1'>
          <span>
            Auto
          </span>
          <input
            type="checkbox"
            id="height"
            checked={localParams?.height === 'auto'}
            onChange={(e) => handleParamChange('height', e.target.checked ? 'auto' : '')}
          />

        </div>
        <input
          type="number"
          id="height"
          value={localParams?.height || ''}
          onChange={(e) => handleParamChange('height', Number(e.target.value))}
        />
      </form>
      <form>
        <label htmlFor="width">Hauteur (%):</label>
        <input
          type="range"
          id="height"
          min={0}
          max={100}
          value={String(localParams?.height)?.split('%')[0] || ''}
          onChange={(e) => handleParamChange('height', Number(e.target.value) + '%')}
        />
        {String(localParams?.height)?.includes('%') && String(localParams?.height)}
      </form>
      <form>
        <label htmlFor="height">Hauteur (vh):</label>
        <input
          type="range"
          id="height"
          min={0}
          max={100}
          value={String(localParams?.height)?.split('vh')[0] || ''}
          onChange={(e) => handleParamChange('height', Number(e.target.value) + 'vh')}
        />
        {String(localParams?.height)?.includes('vh') && String(localParams?.height)}
      </form>
      <div>
        <h5>Marge extérieure</h5>
        <form>
          <label htmlFor="marginTop">Haut :</label>
          <input
            type="range"
            id="marginTop"
            min={0}
            max={1000}
            value={localParams?.margin?.top || ''}
            onChange={(e) => handleSubParamChange('margin', 'top', Number(e.target.value))}
          />
          <input
            type="number"
            id="marginTop"
            value={localParams?.margin?.top || ''}
            onChange={(e) => handleSubParamChange('margin', 'top', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="marginRight">Droite :</label>
          <input
            type="range"
            id="marginRight"
            min={0}
            max={1000}
            value={localParams?.margin?.right || ''}
            onChange={(e) => handleSubParamChange('margin', 'right', Number(e.target.value))}
          />
          <input
            type="number"
            id="marginRight"
            value={localParams?.margin?.right || ''}
            onChange={(e) => handleSubParamChange('margin', 'right', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="marginBottom">Bas :</label>
          <input
            type="range"
            id="marginBottom"
            min={0}
            max={1000}
            value={localParams?.margin?.bottom || ''}
            onChange={(e) => handleSubParamChange('margin', 'bottom', Number(e.target.value))}
          />
          <input
            type="number"
            id="marginBottom"
            value={localParams?.margin?.bottom || ''}
            onChange={(e) => handleSubParamChange('margin', 'bottom', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="marginLeft">Gauche :</label>
          <input
            type="range"
            id="marginLeft"
            min={0}
            max={1000}
            value={localParams?.margin?.left || ''}
            onChange={(e) => handleSubParamChange('margin', 'left', Number(e.target.value))}
          />
          <input
            type="number"
            id="marginLeft"
            value={localParams?.margin?.left || ''}
            onChange={(e) => handleSubParamChange('margin', 'left', Number(e.target.value))}
          />
        </form>
      </div>


      <div>
        <h5>Marge intérieure</h5>
        <form>
          <label htmlFor="paddingTop">Haut :</label>
          <input
            type="range"
            id="paddingTop"
            min={0}
            max={1000}
            value={localParams?.padding?.top || ''}
            onChange={(e) => handleSubParamChange('padding', 'top', Number(e.target.value))}
          />
          <input
            type="number"
            id="paddingTop"
            value={localParams?.padding?.top || ''}
            onChange={(e) => handleSubParamChange('padding', 'top', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="paddingRight">Droite :</label>
          <input
            type="range"
            id="paddingRight"
            min={0}
            max={1000}
            value={localParams?.padding?.right || ''}
            onChange={(e) => handleSubParamChange('padding', 'right', Number(e.target.value))}
          />
          <input
            type="number"
            id="paddingRight"
            value={localParams?.padding?.right || ''}
            onChange={(e) => handleSubParamChange('padding', 'right', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="paddingBottom">Bas :</label>
          <input
            type="range"
            id="paddingBottom"
            min={0}
            max={1000}
            value={localParams?.padding?.bottom || ''}
            onChange={(e) => handleSubParamChange('padding', 'bottom', Number(e.target.value))}
          />
          <input
            type="number"
            id="paddingBottom"
            value={localParams?.padding?.bottom || ''}
            onChange={(e) => handleSubParamChange('padding', 'bottom', Number(e.target.value))}
          />
        </form>
        <form>
          <label htmlFor="paddingLeft">Gauche :</label>
          <input
            type="range"
            id="paddingLeft"
            min={0}
            max={1000}
            value={localParams?.padding?.left || ''}
            onChange={(e) => handleSubParamChange('padding', 'left', Number(e.target.value))}
          />
          <input
            type="number"
            id="paddingLeft"
            value={localParams?.padding?.left || ''}
            onChange={(e) => handleSubParamChange('padding', 'left', Number(e.target.value))}
          />
        </form>

        {/* <CssEditor
        templateId={currentTemplate?._id!}
        /> */}
      </div>

    </div>
  );
}

export default BoxModelStyles;
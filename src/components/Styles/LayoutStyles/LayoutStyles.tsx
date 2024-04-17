/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC } from 'react';
import './LayoutStyles.css';


interface LayoutStylesProps {
  localParams: any
  handleParamChange: (property: string, value: any) => void
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const LayoutStyles: FC<LayoutStylesProps> = ({ localParams, handleParamChange, handleSubParamChange }) => {

  console.log(localParams);
  
  const renderSelectFormItem = (label: string, id: string, options: string[], selectedValue: string, onChange: (value: string) => void) => (
    <form key={id}>
      <label htmlFor={id}>{label} :</label>
      <select className='form-control' id={id} value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </form>
  );

  return (
    <div className="LayoutStyles">
      <form>
        <label htmlFor="display">Affichage :</label>
        <select className='form-control'
          id="display"
          value={localParams?.display || ''}
          onChange={(e) => handleParamChange('display', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="block">Bloc</option>
          <option value="inline">En ligne</option>
          <option value="inline-block">En ligne bloc</option>
          <option value="flex">Flexible</option>
          <option value="inline-flex">Flexible en ligne</option>
          <option value="grid">Grille</option>
          {/* Ajoutez d'autres options pour d'autres valeurs de display si nécessaire */}
        </select>
      </form>
      <form>
        <label htmlFor="position">Position :</label>
        <select className='form-control'
          id="position"
          value={localParams?.position || ''}
          onChange={(e) => handleParamChange('position', e.target.value)}
        >
          <option value="">Sélectionnez</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolue</option>
          <option value="fixed">Fixe</option>
          <option value="sticky">Sticky</option>
          {/* Ajoutez d'autres options pour d'autres valeurs de position si nécessaire */}
        </select>
      </form>
      {localParams?.position && (
        <form>
          <label htmlFor="top">Haut :</label>

          <div className="form-check form-switch">
            <input 
            className="form-check-input" 
            type="checkbox" 
             
            defaultChecked={localParams?.top == 'auto'}
            onChange={(e) => handleParamChange('top', e.target.checked ? 'auto' : '')}
             />
            Auto
          </div>

          <input className='form-control'
            type="number"
            id="top"
            value={localParams?.top || ''}
            onChange={(e) => handleParamChange('top', Number(e.target.value))}
          />
        </form>
      )}
      {localParams?.position && (
        <form>
          <label htmlFor="left">Gauche :</label>
          <div className="form-check form-switch">
            <input 
            className="form-check-input" 
            type="checkbox" 
             
            defaultChecked={localParams?.left == 'auto'}
            onChange={(e) => handleParamChange('left', e.target.checked ? 'auto' : '')}
             />
            Auto
          </div>
          <input className='form-control'
            type="number"
            id="left"
            value={localParams?.left || ''}
            onChange={(e) => handleParamChange('left', Number(e.target.value))}
          />
        </form>
      )}
      {localParams?.position && (
        <form>
          <label htmlFor="bottom">Bas :</label>
          <div className="form-check form-switch">
            <input 
            className="form-check-input" 
            type="checkbox" 
             
            defaultChecked={localParams?.bottom == 'auto'}
            onChange={(e) => handleParamChange('bottom', e.target.checked ? 'auto' : '')}
             />
            Auto
          </div>
          <input className='form-control'
            type="number"
            id="bottom"
            value={localParams?.bottom || ''}
            onChange={(e) => handleParamChange('bottom', Number(e.target.value))}
          />
        </form>
      )}

      {localParams?.position && (
        <form>
          <label htmlFor="right">Droite :</label>
          <div className="form-check form-switch">
            <input 
            className="form-check-input" 
            type="checkbox" 
             
            defaultChecked={localParams?.right == 'auto'}
            onChange={(e) => handleParamChange('right', e.target.checked ? 'auto' : '')}
             />
            Auto
          </div>
          <input className='form-control'
            type="number"
            id="right"
            value={localParams?.right || ''}
            onChange={(e) => handleParamChange('right', Number(e.target.value))}
          />
        </form>
      )}
      {localParams?.position && (
        <form>
          <label htmlFor="bottom">Z-Index :</label>
          <div className="form-check form-switch">
            <input 
            className="form-check-input" 
            type="checkbox" 
             
            defaultChecked={localParams?.zIndex == 'auto'}
            onChange={(e) => handleParamChange('zIndex', e.target.checked ? 'auto' : '')}
             />
            Auto
          </div>
          <input className='form-control'
            type="number"
            id="zIndex"
            value={localParams?.zIndex || ''}
            onChange={(e) => handleParamChange('zIndex', Number(e.target.value))}
          />
        </form>
      )}
      {/* Formulaires pour les propriétés Flexbox */}
      {localParams?.display && localParams.display.includes('flex') && (
        <>
          {renderSelectFormItem(
            'Direction',
            'flexDirection',
            ['row', 'row-reverse', 'column', 'column-reverse'],
            localParams?.flexbox?.flexDirection || '',
            (value) => handleSubParamChange('flexbox', 'flexDirection', value)
          )}
          {renderSelectFormItem(
            'Axe Principal',
            'justifyContent',
            ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
            localParams?.flexbox?.justifyContent || '',
            (value) => handleSubParamChange('flexbox', 'justifyContent', value)
          )}
          {renderSelectFormItem(
            'Axe Secondaire',
            'alignItems',
            ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
            localParams?.flexbox?.alignItems || '',
            (value) => handleSubParamChange('flexbox', 'alignItems', value)
          )}
        </>
      )}

      {/* Formulaires pour les propriétés Gridbox */}
      {localParams?.display && localParams.display.includes('grid') && (
        <>
          {renderSelectFormItem(
            'Colonnes du template',
            'gridTemplateColumns',
            ['auto', '1fr', '2fr', '3fr', '4fr'], // Ajoutez d'autres options si nécessaire
            localParams?.gridbox?.gridTemplateColumns || '',
            (value) => handleSubParamChange('gridbox', 'gridTemplateColumns', value)
          )}
          {/* Ajoutez d'autres formulaires de sélection pour les autres propriétés de gridbox si nécessaire */}
        </>
      )}
    </div>
  );
}

export default LayoutStyles;
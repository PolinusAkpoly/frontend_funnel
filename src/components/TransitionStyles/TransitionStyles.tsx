/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/02/2024 09:14:02
*/
import React, { FC } from 'react';
import './TransitionStyles.css'; // Assurez-vous d'ajouter les styles nécessaires

interface TransitionStylesProps {
  localParams: any;
  handleParamChange: (property: string, value: any) => void;
  handleParamManyChange: (data: Record<string, string>) => void;
}

const TransitionStyles: FC<TransitionStylesProps> = ({ localParams,  handleParamManyChange }) => {


  const updateTransitionStyles = (changes: Partial<typeof localParams>) => {
    const updatedParams = { ...localParams, ...changes };
    const transitionStylesValue = `${updatedParams?.transitionProperty || 'all'} ${updatedParams?.transitionDuration || '0s'} ${updatedParams?.transitionTimingFunction || 'ease'} ${updatedParams?.transitionDelay || '0s'}`;

    handleParamManyChange({ ...changes, transition: transitionStylesValue });
  };

  return (
    <div className="TransitionStyles">
      <form>
        <label htmlFor="transitionProperty">Propriété :</label>
        <select
          id="transitionProperty"
          value={localParams?.transitionProperty || 'all'}
          onChange={(e) => updateTransitionStyles({ transitionProperty: e.target.value })}
        >
          {/* Ajoutez les options nécessaires */}
          <option value="all">All</option>
          <option value="opacity">Opacity</option>
          <option value="width">Width</option>
          <option value="height">Height</option>
          {/* ... autres options ... */}
        </select>
      </form>

      <form>
        <label htmlFor="transitionDuration">Durée  :</label>
        <input
          type="number"
          id="transitionDuration"
          value={localParams?.transitionDuration || 0}
          onChange={(e) => updateTransitionStyles({ transitionDuration: e.target.value })}
        />
      </form>

      <form>
        <label htmlFor="transitionTimingFunction">Fonction </label>
        <select
          id="transitionTimingFunction"
          value={localParams?.transitionTimingFunction || 'ease'}
          onChange={(e) => updateTransitionStyles({ transitionTimingFunction: e.target.value })}
        >
          {/* Ajoutez les options nécessaires */}
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          {/* ... autres options ... */}
        </select>
      </form>

      <form>
        <label htmlFor="transitionDelay">Délai  :</label>
        <input
          type="number"
          id="transitionDelay"
          value={localParams?.transitionDelay || 0}
          onChange={(e) => updateTransitionStyles({ transitionDelay: e.target.value })}
        />
      </form>

      {/* Autres champs spécifiques aux transitions si nécessaire */}

      {/* Ajoutez ici d'autres champs ou options spécifiques à vos besoins */}

    </div>
  );
};

export default TransitionStyles;

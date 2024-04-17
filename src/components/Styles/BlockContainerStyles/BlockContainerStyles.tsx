/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './BlockContainerStyles.css';


interface BlockContainerStylesProps {
  localParams: any
  defaultContainer?: string
  handleSetContainer: (container: string) => void,
  handleParamChange: (property: string, value: any) => void,
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const BlockContainerStyles: FC<BlockContainerStylesProps> = ({defaultContainer, handleSetContainer }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="BlockContainerStyles">

      <form>
        <label htmlFor="container">Conteneur :</label>
        <select name="container" id="container"
        defaultValue={defaultContainer || ''}
          onChange={(e) => handleSetContainer(e.target.value)}
        >
          <option value="" disabled={true}>Choose container</option>
          <option value="container">container</option>
          <option value="container-sm">container-sm</option>
          <option value="container-md">container-md</option>
          <option value="container-lg">container-lg</option>
          <option value="container-xl">container-xl</option>
          <option value="container-xxl">container-xxl</option>
          <option value="container-fuild">container-fuild</option>
        </select>
      </form>

    </div>

  );
}

export default BlockContainerStyles;
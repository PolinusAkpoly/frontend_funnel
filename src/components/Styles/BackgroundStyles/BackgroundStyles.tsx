/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect, useState } from 'react';
import './BackgroundStyles.css';
import FileStorageModal from '../../FileStorageModal/FileStorageModal';
import ColorModal from '../../ColorModal/ColorModal';


interface BackgroundStylesProps {
  localParams: any
  handleParamChange: (property: string, value: any) => void,
  handleSubParamChange: (paramName: string, subParamName: string, value: string | number) => void,
}


const BackgroundStyles: FC<BackgroundStylesProps> = ({ localParams, handleParamChange }) => {
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const UNSET_VALUE = 'unset';

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  }, [])

  const handleChooseFile = (event: any) => {
    event.preventDefault()
    setChooseFile(true)
  }
  const handleSetFile = (link: string) => {
    console.log(link);

    handleParamChange('backgroundImage', `url(${link})`)
    setChooseFile(false)
  }

  return (
    <div className="BackgroundStyles">
      <FileStorageModal
        handleSelectFile={handleSetFile}
        show={chooseFile}
        type={"image/"}
        onHide={() => setChooseFile(false)}
      />
      {/* <form>
        <label htmlFor="backgroundColor">Couleur de fond :</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => handleParamChange('backgroundColor', e.target.checked ? UNSET_VALUE  : '')}
            defaultChecked={localParams?.backgroundColor === UNSET_VALUE }
          />
        </div>

        <input
          type="color"
          id="backgroundColor"
          value={localParams?.backgroundColor || ''}
          onChange={(e) => handleParamChange('backgroundColor', e.target.value)}
        />
      </form> */}

      <ColorModal
        localParams={localParams}
        property='background'
        action={(data: any) => handleParamChange('background', data?.background)}
      />

      <form>
        <label htmlFor="backgroundImage">Image de fond :</label>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={(e) => handleParamChange('backgroundImage', e.target.checked ? UNSET_VALUE : '')}
            defaultChecked={localParams?.backgroundImage === UNSET_VALUE}
          />
        </div>
        <button className='btn btn-success' onClick={handleChooseFile}>Choose</button>

      </form>
      {localParams?.backgroundImage && localParams?.backgroundImage !== UNSET_VALUE &&
        <>
          <form>
            <label htmlFor="backgroundPosition">Position du fond :</label>
            <select
              id="backgroundPosition"
              value={localParams?.backgroundPosition || 'center center'}
              onChange={(e) => handleParamChange('backgroundPosition', e.target.value)}
            >
              <option value="left top">Gauche Haut</option>
              <option value="left center">Gauche Centre</option>
              <option value="left bottom">Gauche Bas</option>
              <option value="center top">Centre Haut</option>
              <option value="center center">Centre Centre</option>
              <option value="center bottom">Centre Bas</option>
              <option value="right top">Droite Haut</option>
              <option value="right center">Droite Centre</option>
              <option value="right bottom">Droite Bas</option>
            </select>
          </form>
          <form>
            <label htmlFor="backgroundSize">Taille du fond :</label>
            <select
              id="backgroundSize"
              value={localParams?.backgroundSize || 'auto'}
              onChange={(e) => handleParamChange('backgroundSize', e.target.value)}
            >
              <option value="auto">Automatique</option>
              <option value="cover">Couvrir (cover)</option>
              <option value="contain">Contenir (contain)</option>
            </select>
          </form>
          <form >
            <label htmlFor="backgroundClip">Clip  :</label>
            <select
              id="backgroundClip"
              value={localParams?.backgroundClip || 'border-box'}
              onChange={(e) => handleParamChange('backgroundClip', e.target.value)}
            >
              <option value="border-box">Bordure (border-box)</option>
              <option value="padding-box">Rembourrage (padding-box)</option>
              <option value="content-box">Contenu (content-box)</option>
            </select>

          </form>
          <form >
            <label htmlFor="backgroundOrigin">Origine  :</label>
            <select
              id="backgroundOrigin"
              value={localParams?.backgroundOrigin || 'padding-box'}
              onChange={(e) => handleParamChange('backgroundOrigin', e.target.value)}
            >
              <option value="border-box">Bordure (border-box)</option>
              <option value="padding-box">Rembourrage (padding-box)</option>
              <option value="content-box">Contenu (content-box)</option>
            </select>

          </form>
          <form >
            <label htmlFor="backgroundRepeat">Répétition  :</label>
            <select
              id="backgroundRepeat"
              value={localParams?.backgroundRepeat || 'no-repeat'}
              onChange={(e) => handleParamChange('backgroundRepeat', e.target.value)}
            >
              <option value="repeat">Répéter (repeat)</option>
              <option value="repeat-x">Répéter horizontalement (repeat-x)</option>
              <option value="repeat-y">Répéter verticalement (repeat-y)</option>
              <option value="no-repeat">Ne pas répéter (no-repeat)</option>
            </select>

          </form>


        </>
      }
    </div>


  );
}

export default BackgroundStyles;
import React, { CSSProperties, useState } from 'react';
import './AudioField.css'
import { cleanLink } from '../../../helpers/utiles';

interface AudioFieldProps {
    src?: string;
    styles?: CSSProperties;
    handleSetting: (setting: any) => void
}

const AudioField: React.FC<AudioFieldProps> = ({ src, handleSetting, styles }) => {
    const [mouseLeave, setMouseLeave] = useState<boolean>(true);


    const handleSetOption = (option: string) => {
        if (option === 'gear') {
          handleSetting({ action: 'SETTING' });
        } else if (option === 'trash') {
          handleSetting({ action: 'DELETE' });
        } else if (option === 'copy') {
          handleSetting({ action: 'DUPLICATE' });
        }
        //  else if (option === 'save') {
        //   handleSave(editorState); // Appel de la fonction pour sauvegarder
        // }
      }

    return (
        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='AudioField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Audio</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>
            {/* <div className="d-flex overlay  justify-content-center align-items-center position-absolute w-100 h-100">
                <button>Edit</button>
            </div> */}
            <audio
                controls
                src={cleanLink(src || window.location.origin + "/assets/audios/success.wav")}
                style={styles}
            ></audio>
           
        </div>
    );
};

export default AudioField;

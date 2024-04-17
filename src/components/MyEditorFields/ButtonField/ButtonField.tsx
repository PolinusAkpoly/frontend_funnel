import React, { useState } from 'react';
import './ButtonField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';

interface ButtonFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const ButtonField: React.FC<ButtonFieldProps> = ({ template, handleSetting }) => {
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


    const { styles, buttonIcon, content } = template

    return (
        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='ButtonField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>File</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>
            
            <button {...template?.attributes} style={styles}>
                { buttonIcon &&  <span dangerouslySetInnerHTML={{__html: buttonIcon}} /> }
               
                <span dangerouslySetInnerHTML={{__html: content}} />
            </button>

        </div>
    );
};

export default ButtonField;

import React, { useState } from 'react';
import './LinkField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';

interface LinkFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const LinkField: React.FC<LinkFieldProps> = ({ template, handleSetting }) => {
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
            className='LinkField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Link</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>
           
            <a  style={ styles} {...template?.attributes}>
                { 
                buttonIcon &&  
                <span dangerouslySetInnerHTML={{__html: buttonIcon}} 
                /> 
                }
               
                <span dangerouslySetInnerHTML={{__html:  content}} />
            </a>

        </div>
    );
};

export default LinkField;

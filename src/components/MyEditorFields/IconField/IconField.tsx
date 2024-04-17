import React, {  useState } from 'react';
import './IconField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';

interface IconFieldProps {
    template: BlockTemplate;
    handleSetting: (setting: any) => void
}

const IconField: React.FC<IconFieldProps> = ({ template, handleSetting }) => {
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
            className='IconField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Icon</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>

            <div style={template.styles} dangerouslySetInnerHTML={{ __html: template.content }} />
        </div>
    );
};

export default IconField;

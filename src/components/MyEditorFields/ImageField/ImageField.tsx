import React, { useState } from 'react';
import './ImageField.css'
import Toolbar from '../../Toolbar/Toolbar';
import { BlockTemplate } from '../../../models/BlockTemplate';

interface ImageFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const ImageField: React.FC<ImageFieldProps> = ({ template, handleSetting }) => {
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

    const { src, alt } = template?.attributes || { src: "", alt: "" }
    const { styles } = template
    return (
        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='ImageField position-relative'
        >
            <Toolbar
                name={"Image"}
                mouseLeave={mouseLeave}
                handleSetOption={handleSetOption} />
            {/* <div className="d-flex overlay  justify-content-center align-items-center position-absolute w-100 h-100">
                <button>Edit</button>
            </div> */}
            <img
                src={src as string || 'http://placehold.it/200X100'}
                alt={alt as string}
                width="100%"
                style={styles}
            />

        </div>
    );
};

export default ImageField;

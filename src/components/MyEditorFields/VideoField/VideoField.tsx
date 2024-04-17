import React, { CSSProperties, useState } from 'react';
import './VideoField.css'
import { OuitubePlayer } from 'ouitube-player';
import { cleanLink } from '../../../helpers/utiles';

interface VideoFieldProps {
    src?: string;
    styles?: CSSProperties;
    handleSetting: (setting: any) => void
}

const VideoField: React.FC<VideoFieldProps> = ({ src, handleSetting, styles }) => {
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
            className='VideoField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Video</div>
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
            <div style={styles}>
                <OuitubePlayer
                    src={cleanLink(src || window.location.origin + "/assets/videos/plage.mp4")}
                    onProgress={(e) => console.log(e)}
                />
            </div>
            {/* <video
                controls
                src={src || '/assets/videos/plage.mp4'}
                width="100%"
                style={styles}
            /> */}

        </div>
    );
};

export default VideoField;

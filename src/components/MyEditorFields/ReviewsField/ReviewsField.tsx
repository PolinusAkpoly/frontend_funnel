import React, { useEffect, useState } from 'react';
import './ReviewsField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';
import Reviews from '../../Reviews/Reviews';

interface ReviewsFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const ReviewsField: React.FC<ReviewsFieldProps> = ({ template, handleSetting }) => {
    const [mouseLeave, setMouseLeave] = useState<boolean>(true);
    
    // const user = useSelector(getCurrentUser)

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


    const { content } = template
    console.log(content);


    useEffect(() => {
       
          
        
      },[]);

    

    return (
        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='ReviewsField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Reviews</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>

            {/* <a  style={ styles} {...template?.attributes}>
                { 
                buttonIcon &&  
                <span dangerouslySetInnerHTML={{__html: buttonIcon}} 
                /> 
                }
               
                <span dangerouslySetInnerHTML={{__html:  content}} />
            </a> */}

           
            <Reviews
            // content ={content}
            />
           


        </div>
    );
};

export default ReviewsField;

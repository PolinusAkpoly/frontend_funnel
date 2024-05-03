import React, {  useEffect, useState } from 'react';
import './AccordionField.css'
import { BlockTemplate } from '../../../models/BlockTemplate';

import { Accordion } from '../../../models/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { getBlocks } from '../../../redux/selectors/selectors';
import { Block } from '../../../models/Block';
// import { useParams } from 'react-router-dom';
import { ADD_TO_STORAGE } from '../../../redux/actions/actionTypes';
// import { setItem } from '../../../helpers/localsorage.service';




interface AccordionFieldProps {
    template: BlockTemplate
    handleSetting: (setting: any) => void
}

const AccordionField: React.FC<AccordionFieldProps> = ({ template, handleSetting }) => {

    const { content } = template
    const [mouseLeave, setMouseLeave] = useState<boolean>(true);
    const [accordions, setAccordions] = useState<Accordion[]>([]);
    const [clickTitle, setClickTitle] = useState<boolean>(false);
    // const [newBlocks, setNewBlocks] = useState<Block[]>([]);
    const blocks = useSelector(getBlocks)
    // const { tunnelId, stepId } = useParams();
    const dispatch = useDispatch()
   
// console.log(newBlocks);

// console.log(accordions);


    useEffect(() => {
        if (typeof content === 'string') { 
            try {
                var parsedContent = JSON.parse(content); 
                // console.log('parsedContent', parsedContent);
                setAccordions(parsedContent); 
            } catch (error) {
                console.error("Erreur lors de l'analyse du contenu JSON :", error);
            }
        } else if (!Array.isArray(content)) { 
            setAccordions([JSON.parse(content)]); 
        } else {
            setAccordions(content); 
        }
        
        // console.log(blocks);
       
        
        
    }, [content]);
    
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


    // const { styles, buttonIcon, content } = template


    // const handleChange = (event: any, index: number) => {
    //     event.preventDefault();
    //     const { name, value, type } = event.target;

    //     setAccordions(prevAccordions => {
    //         const updatedAccordions = [...prevAccordions];
    //         if (type === "text" && name === "title") {
    //             updatedAccordions[index].title = value;
    //         } else if (type === "text" && name === "content-title") {
    //             updatedAccordions[index].content.title = value;
    //         } else if (type === "textarea") {
    //             updatedAccordions[index].content.content = value;
    //         }

    //         return updatedAccordions;
    //     });



    // };
       
    const updateCurrentBlock = (b?: Block) => {
        dispatch({
          type: ADD_TO_STORAGE,
          unique: true,
          key: 'currentBlock',
          payload: b
        })
      }



    const handleChange = (event: any, index: number) => {
        event.preventDefault();
        const { name, value, type } = event.target;

        // console.log(name+ "= "+ value);
        
        // const updatedAccordion = {}



        setAccordions(prevAccordions => {
            const updatedAccordions = [...prevAccordions];
            if (type === "text" && name === "title") {
                updatedAccordions[index].title = value;
            }else if (type === "textarea") {
                updatedAccordions[index].content = value;
            }

            return updatedAccordions;
        });

        if (template) {
            const updatedBlocks = blocks.map((block: Block) => {
              if (template) {
                // Update template styles
                block.templates = block.templates.map((item) => {
                  if (item._id === template._id) {
      
                    if(accordions){
                      item.content = accordions
                     
                    }
      
                  }
      
                  return item
                });
              }
              return block;
            });
      
            // setNewBlocks(updatedBlocks)
            updateCurrentBlock(updatedBlocks)
          }

    };

    
    


    return (
        <div
            onMouseLeave={() => setMouseLeave(true)}
            onMouseEnter={() => setMouseLeave(false)}
            className='AccordionField position-relative'
        >
            <div className={'toolbar d-flex align-items-center d-orange d-flex justify-content-between ' + (mouseLeave ? " mouseLeave" : '')}>
                <div>Accordion</div>
                <div>
                    {/* Icônes pour les actions d'édition */}
                    {['gear', 'copy', 'save', 'trash'].map((icon) => (
                        <span key={icon} onMouseDown={() => handleSetOption(icon)} className='header-button'>
                            <i className={`fa-solid fa-${icon}`} />
                        </span>
                    ))}
                </div>
            </div>

            {
                accordions.length ?
                    accordions.map((accordion: Accordion, index: number) => {
                        return <div key={index} className="accordion-item">
                            <h2 className="accordion-header"
                             onClick={() =>setClickTitle(!clickTitle)}
                            >
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${index}`} // Utilisation d'un ID unique
                                    aria-expanded="false"
                                    aria-controls={`collapse-${index}`}
                                >
                                    <h4  style={{ minWidth: "100%" }}>
                                        <input
                                            name="title"
                                            type="text"
                                            onChange={(event) => handleChange(event, index)}
                                           
                                            style={{ minWidth: "100%" }}
                                            defaultValue={accordion.title}
                                            className={'p-2 ' + (clickTitle ? 'bg-black' : '')}

                                        />
                                    </h4>
                                </button>
                            </h2>
                            <div
                                id={`collapse-${index}`} // Utilisation d'un ID unique
                                className="accordion-collapse collapse"
                                data-bs-parent=".AccordionField"
                            >
                                <div className="accordion-body ">
                                    {/* <h4 className="accordion-header py-1">
                                        <input
                                            name="content-title"
                                            type="text"
                                            onChange={(event) => handleChange(event, index)}
                                            style={{ minWidth: "100%" }}                                        
                                            defaultValue={accordion.content.title}
                                        />
                                    </h4> */}
                                    <textarea
                                        name="content"
                                        onChange={(event) => handleChange(event, index)}
                                        style={{ minWidth: "100%", height: "120px" }}                                   
                                        defaultValue={accordion.content}
                                        className='p-2'

                                    />
                                </div>
                            </div>
                        </div>
                    })
                    :

                    null
            }

        </div>
    );
};

export default AccordionField;

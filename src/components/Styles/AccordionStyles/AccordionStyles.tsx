/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect, useState } from 'react';
import './AccordionStyles.css';
import { useSelector } from 'react-redux';
import { getCurrentTemplate } from '../../../redux/selectors/selectors';
import { Accordion } from '../../../models/Accordion';

interface AccordionStylesProps {
  localParams: any,
  handleParamManyChange: (data: Record<string, string>) => void,
}


const AccordionStyles: FC<AccordionStylesProps> = ({  localParams, handleParamManyChange }) => {

  const updateAccordion = (changes: Partial<typeof localParams>) => {
    
    const updatedParams = { ...localParams, ...changes };
    console.log(updatedParams);
    handleParamManyChange(updatedParams)
  };


  const currentTemplate = useSelector(getCurrentTemplate)
  const [accordions, setAccordions] = useState<Accordion[]>([]);
 

  useEffect(() => {
    if (typeof currentTemplate.content === 'string') {
      try {
        var parsedContent = JSON.parse(currentTemplate.content);
        setAccordions(parsedContent);
      } catch (error) {
        console.error("Erreur lors de l'analyse du contenu JSON :", error);

      }
    } else if (!Array.isArray(currentTemplate.content)) {
      setAccordions(JSON.parse(currentTemplate.content));
    } else {
      setAccordions(currentTemplate.content);
    }

  }, [currentTemplate?.content]);

  return (
    <div className="AccordionStyles">
      {accordions ? (
        accordions.map((accordion: Accordion, index: number) => (
          <div className='d-flex flex-column' key={index}>
            <form className='gap-2'>
              <label htmlFor="linkText">Title</label>
              <input
                type="text"
                className='form-control'
                name="title"
                defaultValue={accordion.title}
                onChange={(e) => updateAccordion({ title: e.target.value })}
              />
            </form>
            <form className='gap-2'>
              <label htmlFor="linkText">Content</label>
              <input
                type="text"
                className='form-control'
                name="content"
                defaultValue={accordion.content}
                onChange={(e) => updateAccordion({ content: e.target.value })}
              />
            </form>
          </div>
        ))
      ) : null}
    </div>
  );
  
}

export default AccordionStyles;
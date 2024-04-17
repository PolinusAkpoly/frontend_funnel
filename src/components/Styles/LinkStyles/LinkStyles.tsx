/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './LinkStyles.css';
import { useSelector } from 'react-redux';
import { getCurrentTemplate } from '../../../redux/selectors/selectors';

interface LinkStylesProps {
  handleParamChange: (property: string, value: any) => void
}


const LinkStyles: FC<LinkStylesProps> = ({ handleParamChange }) => {


  const currentTemplate = useSelector(getCurrentTemplate)

  // const renderSelectFormItem = (label: string, id: string, options: string[], selectedValue: string, onChange: (value: string) => void) => (
  //   <form key={id}>
  //     <label htmlFor={id}>{label} :</label>
  //     <select id={id} value={selectedValue} onChange={(e) => onChange(e.target.value)}>
  //       {options.map((option) => (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       ))}
  //     </select>
  //   </form>
  // );

  useEffect(() => {

  }, [currentTemplate?.content])




  return (
    <div className="LinkStyles">
      <form className='gap-2'>
        <label htmlFor="linkText">Text</label>
        <input
          type="text"
          className='form-control'
          name="content"
          defaultValue={currentTemplate.content}
          onChange={(e) => handleParamChange('content', e.target.value)}
        />
      </form>
      <form className='gap-2'>
        <label htmlFor="linkText">Href</label>

        <input
          type="url"
          className='form-control'
          name="href"
          defaultValue={currentTemplate?.attributes?.href}
          onChange={(e) => handleParamChange('href', e.target.value)}
        />
      </form>
      <form className="gap-2">
        <label htmlFor="linkText">Target:</label>
        <select
          name="target"
          value={currentTemplate?.attributes?.target || ''}
          onChange={(e) => handleParamChange('target', e.target.value)}
        >
          <option value="">Null</option>
          <option value="_blank">Blank</option>
          <option value="_self">Self</option>
          <option value="_parent">Parent</option>
          <option value="_top">Top</option>
        </select>
      </form>
      <form className='gap-2'>
        <label htmlFor="linkText">Class </label>

        <input
          type="text"
          className='form-control'
          name="class"
          defaultValue={currentTemplate?.attributes?.class}
          onChange={(e) => handleParamChange('class', e.target.value)}
        />
      </form>
     

    </div>
  );
}

export default LinkStyles;
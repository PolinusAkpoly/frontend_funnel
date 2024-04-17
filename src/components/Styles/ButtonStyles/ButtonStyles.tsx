/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 18/02/2024 11:16:19
*/
import React, { FC, useEffect } from 'react';
import './ButtonStyles.css';
import { useSelector } from 'react-redux';
import { getCurrentTemplate } from '../../../redux/selectors/selectors';

interface ButtonStylesProps {
  handleParamChange: (property: string, value: any) => void
}


const ButtonStyles: FC<ButtonStylesProps> = ({ handleParamChange }) => {


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
    <div className="ButtonStyles">
      <form className='gap-2'>
        <label htmlFor="buttonText">Text</label>
        <input
          type="text"
          className='form-control'
          name="content"
          defaultValue={currentTemplate.content}
          onChange={(e) => handleParamChange('content', e.target.value)}
        />
      </form>
      <form className='gap-2'>
        <label htmlFor="buttonText">class</label>
        <input
          type="text"
          className='form-control'
          name="class"
          defaultValue={currentTemplate?.attributs?.class}
          onChange={(e) => handleParamChange('class', e.target.value)}
        />
      </form>
    </div>
  );
}

export default ButtonStyles;
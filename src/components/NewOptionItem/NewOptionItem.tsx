/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/03/2024 12:39:12
*/
import React, { FC, useEffect } from 'react';
import './NewOptionItem.css';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';


interface Field {
  label: string
  name: string
  type: string
  options: any[]
  inputType: string
}
interface NewOptionItemProps {
  fields: Field[]
  handleChange: (option: any)=>void
  optionValue: any
 
}


const NewOptionItem : FC<NewOptionItemProps> = ({fields, optionValue, handleChange}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="NewOptionItem">
          {
          fields.map((field, index)=>{
            if (field.type.startsWith('input')) {
              return (
                <InputField
                  key={index}
                  type={field.inputType}
                  name={field.name}
                  label={field.label}
                  value={optionValue[field?.name as any]}
                  onChange={(e: any) => { handleChange(e) }}
                  
                />
              );
            }
            if (field.type === 'select') {
              return <div>
                <SelectField
                  key={index}
                  label={field.label}
                  name={field.name}                
                  options={field?.options}
                  value={optionValue[field?.name as any]}
                  onChange={(e: any) => { handleChange(e) }}
                />
                
             </div>
            }
           
          })
          }
      </div>
  );
}

export default NewOptionItem;
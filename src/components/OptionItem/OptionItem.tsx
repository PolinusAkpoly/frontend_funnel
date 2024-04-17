/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/02/2024 15:11:43
*/
import React, { FC, useEffect } from 'react';
import './OptionItem.css';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';


interface Field {
  type: string;
  inputType: string;
  name: string;
  label: string;
  options: any;
}
// interface Option {
//   id?: string;
//   name: string;
//   value: string;
// }
interface OptionItemProps {
  data: any
  fields: Field[],
  handleChange: (option: any) => void
  optionValue?: any

}


const OptionItem: FC<OptionItemProps> = ({ data, fields, handleChange, optionValue }) => {


  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  }, [data, optionValue])

  return (
    <div className='card my-2 p-1'>
      <form action="">
        {fields?.map((field: any, index: number) => {
          console.log(optionValue);


          if (field.type.startsWith('input')) {
            return optionValue?.map((elt: any, index_2: number) => (
              <div key={index_2}>
                <InputField
                  type={field.inputType}
                  name={field.name}
                  label={field.label}
                  value={field.name === 'name' ? elt.name : elt.value}
                  onChange={(e: any) => { handleChange(e) }}
                />
              </div>
            ));
          }
          if (field.type === 'select') {
            console.log(field.options);
            return (
              <SelectField
                key={index}
                label={field.label}
                name={field.name}
                options={field.options}
                value={data[field?.name as any]}
                onChange={(e: any) => { handleChange(e) }}
              />
            );
          }
        })}
      </form>

    </div>
  );
}

export default OptionItem;
/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 01/02/2024 11:59:14
*/
import React, { FC, useEffect, useState } from 'react';
import './OptionsField.css';
// import InputField from '../InputField/InputField';
import OptionItem from '../OptionItem/OptionItem';
import { generateUniqueId } from '../../helpers/utiles';


interface Field {
  type: string;
  inputType: string;
  name: string;
  label: string;
  options: any;
 
}
interface OptionsFieldProps {
  fields: Field[];
  setOptions(option: any[]): void;
  values: any[]
}



const OptionsField: FC<OptionsFieldProps> = ({ fields, setOptions, values  }) => {

  const [localOptions, setLocalOptions] = useState<any[]>([]);
  const [canAdd, setCanAdd] = useState<boolean>(true);
 
  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      console.log(values);
      
    }
    runLocalData()
  }, [])


  const handleAddFields = (e: any) => {
    e.preventDefault();

    const fieldArr: any = fields?.map((f: any) => f.name)
    const initialValues: any = { _id: generateUniqueId() }

    fieldArr.forEach((name: string) => {
      initialValues[name] = ''
    });

    setLocalOptions([...localOptions, initialValues]);
    setCanAdd(false)
    // if (isOkAddFields) {
    //   setLocalOptions([...localOptions, initialValues]);
    // }

  };




  const deleteOptionItem = (_id: any) => {
    let options = localOptions.filter(f => f._id !== _id)
    setLocalOptions(options);
    if(!options.length){
      setCanAdd(true)
    }
  }

  const handleChange = (e: any, index: number) => {
    const options = localOptions
    const { name, value } = e.target
    options[index][name] = value
  
    setLocalOptions(options)

    let isValid = true

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      console.log(option[name]);

      for (let j = 0; j < Object.keys(option).length; j++) {
        const key = Object.keys(option)[j];
        if (!option[key]) {
          isValid = false
          return
        }
      }

    
    }
    console.log({ isValid });
    if(isValid){
      setOptions(options)
    }
    setCanAdd(isValid)


  }


  return (
    <div className="OptionsField card my-2 p-1">
      <div>
        {localOptions?.map((data: any, index: number) => {
          return <div className="d-flex" key={data._id}>

            <div className="flex-1 col-11">
              {
                values.map((optionValue)=>{
                  return <OptionItem
                  data={data}
                  fields={fields}
                  handleChange={(event) => handleChange(event, index)}
                  optionValue={optionValue}
                />
                })
              }
              
            </div>



            <span onClick={() => deleteOptionItem(data._id)} className="py-1 btn  btn-danger my-1 col-1 btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>

            </span>
          </div>
        })}
        {
          canAdd && (<button onClick={(e: any) => handleAddFields(e)} className="btn-primary btn py-1 my-1 ">Add</button>)
        }
        
      </div>
    </div>
  );
}

export default OptionsField;
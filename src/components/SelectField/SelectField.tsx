import React, { ChangeEvent, useEffect, useState } from 'react';
import { ucfirst } from '../../helpers/utiles';
import { getDatas } from '../../api/api-entity';

interface Option {
  key: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: Option[];
  value: string;
  model?: string;
  onChange: (value: any) => void;
  
}

const SelectField: React.FC<SelectFieldProps> = ({ label, model, name, options, value, onChange }) => {
 
  const [newOption, setNewOption] = useState<any[]>(options)
 
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // const selectedValue = event.target.value;
    onChange(event);
  };


  const runLocallData = async () =>{
    if(model){
      const datas = await getDatas(model)
      if(datas.isSuccess){
        let newOptionResults = datas.results.map((d: any) => {return {value: d._id, key: d.name}})
        console.log({newOptionResults});
        
        setNewOption(newOptionResults)
      }
      
    }
  }

  useEffect(()=>{
  
    runLocallData()
  },[])


  return (
    <div>
      <label>{ucfirst(label)}</label>
      <select className='form-control' multiple={label.toLowerCase().endsWith('s')} 
      name={name} 
      defaultValue={value} 
      onChange={handleSelectChange}>
        {
        newOption.map((option) => (
          <option key={option.key} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>

      
    </div>
  );
};

export default SelectField;

/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 22/02/2024 11:09:57
*/
import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker'


interface GradientColorPickerProps {
  onChange: (color: string) => void;
  handleClose: () => void;
}

const GradientColorPicker: React.FC<GradientColorPickerProps> = ({ onChange, handleClose }) => {
  const [color, setColor] = useState('rgba(255,255,255,1)');

  const handleChange = (data: any) => {
    setColor(data)
    onChange(data)
    console.log({ data });

  }

  return <div className="GradientColorPicker card p-1 rounded-2" onMouseLeave={handleClose}>
    <div className="d-flex justify-content-end">
      <button onClick={handleClose} className='btn-close'></button>
    </div>
    <ColorPicker
      value={color}
      onChange={handleChange}
      width={250}
      height={100}
    />
  </div>


};

export default GradientColorPicker;

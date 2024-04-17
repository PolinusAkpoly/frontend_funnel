/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/02/2024 15:03:18
*/
import React, { FC, useEffect } from 'react';
import './ImageTool.css';


interface ImageToolProps {
 
}


const ImageTool : FC<ImageToolProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="ImageTool d-flex position-relative justify-content-center align-items-center p-2">
        <div className="d-flex overlay  justify-content-center align-items-center position-absolute w-100 h-100">
          <button className='btn btn-success'> Change </button>
        </div>
          <img src="http://placehold.it/600x300" alt="image" />
      </div>
  );
}

export default ImageTool;
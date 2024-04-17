/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 12:48:30
*/
import React, { FC, useEffect } from 'react';
import './Prices.css';


interface PricesProps {
 
}


const Prices : FC<PricesProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="Prices">
          Prices Component
      </div>
  );
}

export default Prices;
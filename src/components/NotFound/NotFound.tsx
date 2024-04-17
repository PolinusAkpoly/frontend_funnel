/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 11:45:40
*/
import React, { FC, useEffect } from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';


interface NotFoundProps {
 
}


const NotFound : FC<NotFoundProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="NotFound">
          <h1>404</h1>
          <p>Page not found !</p>
          <Link className='btn btn-primary' to={'/'}>Home</Link>
      </div>
  );
}

export default NotFound;
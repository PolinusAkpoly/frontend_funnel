/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/01/2024 18:04:32
*/
import React, { FC, useEffect } from 'react';
import './SignIn.css';


interface SignInProps {
 
}


const SignIn : FC<SignInProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="SignIn">
          SignIn Component
      </div>
  );
}

export default SignIn;
/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 18:51:24
*/
import React, { FC, useEffect } from 'react';
import './PageHeader.css';


interface PageHeaderProps {
  name: string
}


const PageHeader: FC<PageHeaderProps> = ({ name }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="PageHeader shadow-lg">
      <header className="bg-dark py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-center">
            <div className="col-lg-8 col-xl-7 col-xxl-6">
              <h2 className='text-white'>{name}</h2>
            </div>
            <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default PageHeader;
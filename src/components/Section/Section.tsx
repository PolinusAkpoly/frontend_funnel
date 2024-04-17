/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 29/01/2024 12:04:13
*/
import React, { FC, useEffect } from 'react';
import './Section.css';
import { Service } from '../../models/Service';


interface SectionProps {
  service: Service
  position: boolean
}


const Section : FC<SectionProps> = ({service, position}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        
      }
      runLocalData()
    },[])

  return (
    <section className={(!position ? 'bg-light': '')}>
      <div className={"container"}>
         <div className="row py-5">
          <div className={"col-md-6 d-flex flex-column justify-content-center "+(position ? "order-1" : "order-2")}>
              <h2>{ service?.name }</h2>
              <p>
              { service?.description }
              </p>
              <div>
                <a href={service.button_link} className="btn btn-success">
                  {service.button_text}
                </a>
              </div>
          </div>
          <div className={"col-md-6 "+(position ? "order-2" : "order-1")}>
              <img 
              className='rounded bordered' 
              width={"100%"}
              src={service.imageUrl ? service.imageUrl : "/assets/images/home.png"} 
              alt="" />
          </div>
         </div>
      </div>

    </section>
  );
}

export default Section;
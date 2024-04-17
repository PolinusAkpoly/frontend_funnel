/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 29/01/2024 12:35:41
*/
import React, { FC, useEffect, useState } from 'react';
import './About.css';
import { getDatas } from '../../api/api-entity';
import Section from '../Section/Section';


interface AboutProps {
 
}


const About : FC<AboutProps> = () =>{

  const [services, setSevices] = useState<any[]>([])

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        const data = await getDatas('service')
        if(data.isSuccess){
          setSevices(data.results)
        }
      }
      runLocalData()
    },[])

  return (
      <div className="About" id='#about'>
          {
            services.map((service, index)=>{
              return <Section key={service._id} service={service} position={ index%2 == 0}/>
            })
          }
      </div>
  );
}

export default About;
/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 06/03/2024 19:34:15
*/
import React, { FC, useEffect, useState } from 'react';
import './ContentPage.css';
import { useParams } from 'react-router-dom';
import { getDatasBySlug } from '../../api/api-entity';



interface ContentPageProps {
 
}


const ContentPage : FC<ContentPageProps> = () =>{

  const { slug } = useParams()


  const [dataPerPage, setDataPerPage] = useState<any>({})
  
  

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        if (slug) { 
          const dataPage = await getDatasBySlug('page', slug)
         
            if (dataPage.isSuccess) {
              setDataPerPage(dataPage.result)
            }
        }

      }
      runLocalData()
    },[slug])

    return (
      <div className="container mt-4">
        <div className="">
          <div className="">
            <h1 className="">{dataPerPage.name}</h1>
             <br />
            <div dangerouslySetInnerHTML={{ __html: dataPerPage.content }} />
          </div>
        </div>
      </div>
    );
}

export default ContentPage;
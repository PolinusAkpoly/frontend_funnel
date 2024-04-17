/*
  Author: Mudey Formation
  Website: https://mudey.fr/
  App Name: E-commerce with React.Js
  Created At: 02/02/2024 12:16:49
*/

import React, { FC, useEffect, useState } from 'react';
import './TemplateShow.css';
import { getTemplateLink } from '../../api/api-entity';
import { Navigate, useParams } from 'react-router-dom';
import { apiUrl } from '../../api/apiUtils';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

interface TemplateShowProps {}

const TemplateShow: FC<TemplateShowProps> = () => {
  const [templateContent, setTemplateContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { templateId, funnelId } = useParams();

  useEffect(() => {
    const runLocalData = async () => {
      if (templateId) {
        try {
          const datas = await getTemplateLink('template', templateId);
          setTemplateContent(datas);
          setLoading(false);
          console.log(datas);
        } catch (error) {
          console.error('Une erreur est survenue lors de la récupération des données du template :', error);
        }
      }
    };

    runLocalData();
  }, []);

 
  
  if (templateContent && !templateContent.isSuccess) {
    return <Navigate to={"/error"} />
  }

  return (
    <div className="TemplateShow">
      {loading ? (
        <Loading />
      ) : (
        <>
        <header className='d-flex gap-2 bg-dark sticky-top justify-content-center'>
          Preview (Mudey Template)

          <Link className='btn btn-success' to={"/tunnel/"+funnelId+"/custom"}>Return</Link>
          </header>
        <iframe src={apiUrl + 'templates/' + templateContent?.result} frameBorder={0} />
        </>
      )}
    </div>
  );
};

export default TemplateShow;

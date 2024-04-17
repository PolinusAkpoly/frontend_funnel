/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 19:49:57
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Admin.css';
import Loading from '../../components/Loading/Loading';
import { useLocation, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import ModelContent from '../../components/ModelContent/ModelContent';
import { getItem } from '../../helpers/localsorage.service';
import Statistiques from '../../components/Statistiques/Statistiques';


interface AdminProps {

}


const Admin: FC<AdminProps> = () => {


  // const [state, setState] = useState<any>(null)
  const { model } = useParams()
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let page: any = queryParams.get('page');
  let limit: any = queryParams.get('limit');
  let query: any = queryParams.get('query');
  let tag: any = queryParams.get('tag');

  // page = page ? parseInt(page, 10) : 1;
  // limit = limit ? parseInt(limit, 10) : 10;

  // Retrieve values from localStorage if available
  const storedPage = getItem('adminPage');
  const storedLimit = getItem('adminLimit');

  page = page || storedPage || 1
  limit = limit || storedLimit || 5



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setLoading(false)
    }
    runLocalData()
  }, [model, page, limit, query, tag])






  return (
    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="Admin">
            <main className="d-flex flex-nowrap">
              <SideBar model={model} />
              {
                model ?
                <ModelContent 
                page={page} 
                limit={limit}
                model={model} 
                />
                :
                <Statistiques/>
              }

            </main>
          </div>

      }
    </Fragment>
  );
}

export default Admin;
/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 29/01/2024 10:29:17
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Main.css';
import Loading from '../../components/Loading/Loading';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';


interface MainProps {

}


const Main: FC<MainProps> = () => {


  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setLoading(false)
    }
    runLocalData()
  }, [])

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Ajoutez d'autres routes si nécessaire */}
        </Routes>
      )}
    </Fragment>
  );
}

export default Main;
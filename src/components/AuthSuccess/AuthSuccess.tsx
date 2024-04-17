/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/10/2023 09:14:01
*/
import React, { FC, useEffect, useState } from 'react';
import './AuthSuccess.css';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../../api/api-entity';
import { ADD_NOTIFICATION, CONNECTED } from '../../redux/actions/actionTypes';
import { useDispatch } from 'react-redux';
import { generateId } from '../../helpers/utils';


interface AuthSuccessProps {

}


const AuthSuccess: FC<AuthSuccessProps> = () => {


  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState<boolean>(false)
  const queryParams = new URLSearchParams(window.location.search);

  const [token, setToken] = useState<string | null>(queryParams.get('token'))

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      if (token) {
        const data = await verifyToken(token)
        if (data.isSuccess) {
          setRedirect(true)
          dispatch({
            type: CONNECTED,
            payload: {
              token: token,
              userId: data?.user._id,
              user: data?.user
            }
          })
          dispatch({
            type: ADD_NOTIFICATION,
            payload: {
              _id: generateId(),
              message: data.message,
              status: "success",
              timeout: 2000
            }
          })
        } else {
          setToken(null)
        }

      }
    }
    runLocalData()
  })

  if (!token) {
    return <Navigate to="/signin" />
  }
  if (!redirect) {
    return <Navigate to="/dashboard/movie-list" />
  }

  return (
    <div className="AuthSuccess">
      AuthSuccess Component
    </div>
  );
}

export default AuthSuccess;
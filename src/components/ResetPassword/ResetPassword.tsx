/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/10/2023 18:10:54
*/
import React, { FC, useEffect, useState } from 'react';
import './ResetPassword.css';
import { useFormik } from 'formik';
import { resetPassword } from '../../api/api-entity';
import { ADD_NOTIFICATION, CONNECTED } from '../../redux/actions/actionTypes';
import { generateId } from '../../helpers/utils';
import { useDispatch } from 'react-redux';
import { validatePassword } from '../../validators/form-validator';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/selectors/selectors';
import { getItem, removeItem } from '../../helpers/localsorage.service';
import { useTranslation } from 'react-i18next';



interface ResetPasswordProps {

}


const ResetPassword: FC<ResetPasswordProps> = () => {

  const params = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthState)
  const [redirect, setRedirect] = useState<any>(false)
  const [formError, setFormError] = useState<string>("");
  const validate = validatePassword
  document.body.classList.remove("light")

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate,
    onSubmit: async (user: any) => {
      user.reset_password_token = params.reset_password_token
      const result = await resetPassword(user)
      // alert(JSON.stringify(result, null, 2));
      if (result.isSuccess) {
        setRedirect(true)
        console.log(result);
        setFormError("")

        dispatch({
          type: CONNECTED,
          payload: {
            token: result?.auth_token,
            userId: result?.userId,
            user: result?.user
          }
        })
        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: result.message,
            status: "success",
            timeout: 2000
          }
        })

      } else {
        setRedirect(false)
        setFormError(result.message)

        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: result.message || "Error, please try again !",
            status: "danger",
            timeout: 2000
          }
        })
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  if (redirect) {
    let pathname: any = getItem("pathname")
    if (pathname) {
      removeItem("pathname")
      return <Navigate to={""} />
    }
    return <Navigate to="/" />
  }

  if (isAuth) {
    let pathname: any = getItem("pathname")
    if (pathname) {
      removeItem("pathname")
      return <Navigate to={pathname} />
    }
    return <Navigate to="/" />
  }



  return (
    <div className="SignIn">
      <main className="form-signin w-100 m-auto">

          <form noValidate className="mt-4" onSubmit={formik.handleSubmit}>
          <h3 className="mb-0">{t('reset_password')}</h3>
          <div className="error">{formError}</div>
          <p>
            {t('new_password_instruction')}
          </p>
          <div className="form-floating">
                  <input
                    onChange={formik.handleChange}
                    placeholder={t('enter_new_password')}
                    type="password" 
                    className="form-control"
                    name='password'
                    id="password"
                  />
                  <label htmlFor="floatingPassword">{t('enter_new_password')}</label>
                  {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
                </div>
          <div className="form-floating">
                  <input
                    onChange={formik.handleChange}
                    placeholder={t('confirm_new_password')}
                    type="password" 
                    className="form-control"
                    name='confirmPassword'
                    id="password"
                  />
                  <label htmlFor="floatingPassword">{t('confirm_new_password')}</label>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
                </div>
            <div className="d-inline-block w-100">
              <button className="btn btn-primary float-right">{t('reset_password')}</button>
            </div>
          </form>
       
      </main>
    </div>

  )

}

export default ResetPassword;
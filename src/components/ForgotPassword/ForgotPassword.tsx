/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/10/2023 21:04:57
*/
import React, { FC, useEffect, useState } from 'react';
import './ForgotPassword.css';
import { useFormik } from 'formik';
// import { User } from '../../models/User';
import { authenticateEmail } from '../../api/api-entity';
import { ADD_NOTIFICATION } from '../../redux/actions/actionTypes';
import { generateId } from '../../helpers/utils';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../../validators/form-validator';
import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { getAuthState } from '../../redux/selectors/selectors';
// import { getItem, removeItem } from '../../helpers/localsorage.service';
import { useTranslation } from 'react-i18next';


interface ForgotPasswordProps {

}


const ForgotPassword: FC<ForgotPasswordProps> = () => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  // const isAuth = useSelector(getAuthState)
  const [redirect, setRedirect] = useState<any>(false)
  const [formError, setFormError] = useState<string>("");
  const validate = validateEmail

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: async (user: any) => {
      const result = await authenticateEmail(user)
      // alert(JSON.stringify(result, null, 2));
      if (result.isSuccess) {
        setRedirect({
          userId: result.userId,
          partial_token: result.partial_token,
        })
        setFormError("")

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
      document.body.classList.remove("light")
    }
    runLocalData()
  })

  if (redirect) {
    return <Navigate to={"/verification-email/" + redirect?.partial_token} />
  }


  // if (isAuth) {
  //   let pathname: any = getItem("pathname")
  //   if (pathname) {
  //     removeItem("pathname")
  //     return <Navigate to={pathname} />
  //   }
  //   return <Navigate to="/" />
  // }



  return (
    <div className="ForgotPassword">
      <div className="SignIn">
        <main className="form-signin w-100 m-auto">

          <form noValidate className="mt-4" onSubmit={formik.handleSubmit}>
            <h3 className="mb-0">{t('reset_password')}</h3>
            <div className="error">{formError}</div>
            <p className="text-white">
              {t('reset_password_instruction')}
            </p>
            <div className="form-floating">
              <input
                onChange={formik.handleChange}
                placeholder={t('enter_email')}
                name='email'
                type="email"
                className="form-control"
                id="email" />
              <label htmlFor="floatingInput">Email address</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="d-inline-block w-100">
              <button className="btn btn-primary w-100 py-2">{t('reset_password')}</button>
            </div>
          </form>
        </main>

      </div>
    </div>

  );
}

export default ForgotPassword;
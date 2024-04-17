/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/10/2023 18:01:09
*/
import React, { FC, useEffect, useState } from 'react';
import './VerifyEmail.css';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/selectors/selectors';
import { useFormik } from 'formik';
import { resendVerifyEmailCode, verifyEmailCode } from '../../api/api-entity';
import { ADD_NOTIFICATION } from '../../redux/actions/actionTypes';
import { generateId } from '../../helpers/utils';
import { getItem, removeItem } from '../../helpers/localsorage.service';
import { useTranslation } from 'react-i18next';


interface VerifyEmailProps {

}


const VerifyEmail: FC<VerifyEmailProps> = () => {

  const params = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthState)
  const [redirect, setRedirect] = useState<any>(false)
  const [formError, setFormError] = useState<string>("");
  document.body.classList.remove("light")


  const formik = useFormik({
    initialValues: {
      code_one: '',
      code_two: '',
      code_three: '',
      code_four: '',
      code_five: '',
      code_six: '',
    },
    onSubmit: async (codes: any) => {
      const code = Object.values(codes).join("")
      const partialToken: any = params.partial_token
      const result = await verifyEmailCode({ partial_token: partialToken, code: code })
      if (result.isSuccess) {
        setRedirect({
          path: '/reset-password/' + result.reset_password_token
        })
        console.log(result);
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
      if (!params?.partial_token) {

      }
    }
    runLocalData()
  }, [params?.partial_token])

  if (redirect) {
    return <Navigate to={redirect.path} />
  }

  if (isAuth) {
    let pathname: any = getItem("pathname")
    if (pathname) {
      removeItem("pathname")
      return <Navigate to={pathname} />
    }
    return <Navigate to="/" />
  }

  const handleResendCode = async (event: any) => {
    event.preventDefault()
    const result = await resendVerifyEmailCode(params as any)
    console.log(result);
    if (result.isSuccess) {
      dispatch({
        type: ADD_NOTIFICATION,
        payload: {
          _id: generateId(),
          message: result.message,
          status: "success",
          timeout: 2000
        }
      })
    }
  }

  console.log({ formik });

  const handleChange = (event: any) => {
    const inputValue: string = event.target.value;
    const regex = /^[0-9]{1,2}$/;
    console.log(inputValue);

    if (regex.test(inputValue)) {
      // La valeur est un seul chiffre
      console.log("La valeur est un seul chiffre.");
      event.target.value = inputValue[inputValue.length - 1]
    } else {
      // La valeur n'est pas un seul chiffre
      event.target.value = ""
      console.log("La valeur n'est pas un seul chiffre.");
    }
    formik.handleChange(event)
    event.target.nextSibling?.focus()
    console.log();

  }


  return (
    <div className="SignIn">
          <main className="form-signin w-100 m-auto">
            <div className="sign-in-page-data">
              <div className="sign-in-from w-100 m-auto">
                <h3 className="mb-3 text-center">{t('verify_email_code')}</h3>
                <p>
                  {t('verify_email_instruction')}
                </p>
                <div className="error">{formError}</div>
                <form noValidate className="mt-4" onSubmit={formik.handleSubmit} >
                  <div className="form-group d-flex">
                    <input
                      onChange={handleChange}
                      value={formik.values.code_one}
                      type="text"
                      name='code_one'
                      className="form-control mr-2"
                      autoComplete="off"
                      required />
                    <input
                      onChange={handleChange}
                      type="text"
                      name='code_two'
                      value={formik.values.code_two}
                      className="form-control mr-2"
                      autoComplete="off"
                      required />
                    <input
                      onChange={handleChange}
                      value={formik.values.code_three}
                      type="text"
                      name='code_three'
                      className="form-control mr-2"
                      autoComplete="off"
                      required />
                    <input
                      onChange={handleChange}
                      value={formik.values.code_four}
                      type="text"
                      name='code_four'
                      className="form-control mr-2"
                      autoComplete="off"
                      required />
                    <input
                      onChange={handleChange}
                      value={formik.values.code_five}
                      type="text"
                      name='code_five'
                      className="form-control mr-2"
                      autoComplete="off"
                      required />
                    <input
                      onChange={handleChange}
                      value={formik.values.code_six}
                      type="text"
                      name='code_six'
                      className="form-control mr-0"
                      autoComplete="off"
                      required />
                  </div>
                  <div className="sign-info">
                    <button type="submit" className="btn btn-primary w-100">{t('verify_code')}</button>
                    {/* <div className="custom-control custom-checkbox d-inline-block">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                        </div> */}
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-center links">
                {t('dont_receive_code')}
                <a onClick={handleResendCode} className="text-primary ml-2">{t('resend_code')}</a>
              </div>

            </div>
          </main>

    </div>
  );
}

export default VerifyEmail;
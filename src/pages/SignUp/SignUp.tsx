/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/01/2024 18:05:19
*/
import React, { FC, Fragment, useEffect, useState } from 'react';
import './SignUp.css';
import { Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { validateSignUpForm } from '../../validators/form-validator';
import { User } from '../../models/User';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/selectors/selectors';
import { signupAndAuthenticate } from '../../api/api-entity';
import { ADD_NOTIFICATION } from '../../redux/actions/actionTypes';
import { generateId } from '../../helpers/utils';
import { getItem, removeItem } from '../../helpers/localsorage.service';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { apiUrl } from '../../api/apiUtils';
import Loading from '../../components/Loading/Loading';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';


interface SignUpProps {

}


const SignUp: FC<SignUpProps> = () => {


  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const validate = validateSignUpForm
  const [redirect, setRedirect] = useState<any>(false)
  const [formError, setFormError] = useState<string>("");
  const isAuth = useSelector(getAuthState)
  const { t } = useTranslation()

  const handleSubmit = async (user: User) => {
    console.log(user);
    const result = await signupAndAuthenticate(user)
    // console.log(data);
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

  }
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (user: any) => {     
      handleSubmit(user)
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      document.body.classList.remove("light")
      setLoading(false)
    }
    runLocalData()
  }, [])

  if (redirect) {
    return <Navigate to={"/verification/" + redirect?.partial_token} />
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
    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="SignUp">
            <main className="form-signin w-100 m-auto">
              <form onSubmit={formik.handleSubmit}>
                {/* <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" width={72} height={57} /> */}
                <h1 className="h3 mb-3 fw-normal">{t('Please sign up')}</h1>
                <div className="error">
                  {formError}
                </div>
                <div className="form-floating">
                  <input
                    placeholder={t('enter_fullname')}
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.fullname}
                    name='fullname' className="form-control" id="fullname"
                  />
                  <label htmlFor="fullname">{t('Full Name')}</label>
                </div>
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div className='error text-danger'>{formik.errors.fullname}</div>
                ) : null}
                <div className="form-floating">
                  <input type="email"
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="form-control" id="email"
                    placeholder={t('enter_email')}
                  />
                  <label htmlFor="email">{t('Email')}</label>
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className='error text-danger'>{formik.errors.email}</div>
                ) : null}
                <div className="form-floating">
                  <input
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name='password'
                    className="form-control"
                    id="password"
                    placeholder={t('enter_Password')}
                  />
                  <label htmlFor="password">{t('Password')}</label>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className='error text-danger'>{formik.errors.password}</div>
                ) : null}
                <div className="form-floating">
                  <input
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    name='confirmPassword'
                    className="form-control"
                    id="confirmPassword"
                    placeholder={t('repeat_password')}
                  />
                  <label htmlFor="confirmPassword">{t('repeat_password')}</label>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className='error text-danger'>{formik.errors.confirmPassword}</div>
                ) : null}
                <div className="form-check text-start my-3">
                  <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                  </label>
                </div>

                <button className="btn btn-success w-100 py-2" type="submit">
                  {t('sign_up')}
                </button>

              </form>
              <div className="mt-3">
                <div className="d-flex justify-content-center links">
                  {t('have_account')}
                  <Link to="/signin" className="text-primary ml-2">{t('sign_in')}</Link>
                </div>
              </div>
              <div className="sign-with-google mt-2">
                <Link to={apiUrl + "oauth/auth/google"}>
                  <button className="btn btn-google btn-danger w-100">
                    {t('login_with_google')}
                  </button>
                </Link>

                <LanguageSelector />
              </div>
            </main>
          </div>
      }
    </Fragment>
  );
}

export default SignUp;
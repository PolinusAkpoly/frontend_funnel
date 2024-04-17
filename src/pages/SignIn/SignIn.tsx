// Author: Mudey Formation
// Website: https://mudey.fr/
// App Name: E-commerce with React.Js
// Created At: 26/01/2024 18:05:19

import React, { FC, useEffect, Fragment, useState } from 'react';
import './SignIn.css';
import Loading from '../../components/Loading/Loading';
import { ADD_NOTIFICATION } from '../../redux/actions/actionTypes';
import { generateId } from '../../helpers/utils';
import { authenticate } from '../../api/api-entity';
// import { User } from '../../models/User';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAuthState } from '../../redux/selectors/selectors';
import { useFormik } from 'formik';
import { validateSignInForm } from '../../validators/form-validator';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../api/apiUtils';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { getItem, removeItem } from '../../helpers/localsorage.service';

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuth = useSelector(getAuthState);
  const [redirect, setRedirect] = useState<any>(false);
  const [formError, setFormError] = useState<string>("");
  const validate = validateSignInForm;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (userData: any) => {
      const authenticationResult = await authenticate(userData);

      if (authenticationResult.isSuccess) {
        setRedirect({
          userId: authenticationResult.userId,
          partial_token: authenticationResult.partial_token,
        });
        setFormError("");
      } else {
        setRedirect(false);
        setFormError(authenticationResult.message);

        dispatch({
          type: ADD_NOTIFICATION,
          payload: {
            _id: generateId(),
            message: authenticationResult.message || "Error, please try again!",
            status: "danger",
            timeout: 2000
          }
        });
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const runLocalData = async () => {
      setLoading(false);
    };
    runLocalData();
  }, []);

  if (redirect) {
    return <Navigate to={"/verification/" + redirect?.partial_token} />;
  }
  if (isAuth) {
    let pathname: any = getItem("pathname");
    if (pathname) {
      removeItem("pathname");
      return <Navigate to={pathname} />;
    }
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div className="SignIn">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={formik.handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
              <div className="d-flex justify-content-center links">
                <Link to="/forgot-password" className="f-link">
                  {t('forgot_password')}
                </Link>
              </div>
              <div className="error text-danger">{formError}</div>
              <div className="form-floating">
                <input
                  onChange={formik.handleChange}
                  placeholder={t('enter_email')}
                  name='email'
                  type="email" 
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  id="email"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="error text-danger">{formik.errors.email}</div>
              ) : null}
              <div className="form-floating">
                <input
                  onChange={formik.handleChange}
                  placeholder={t('enter_password')}
                  type="password" 
                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  name='password'
                  id="password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error text-danger">{formik?.errors?.password}</div>
              ) : null}
              <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" defaultValue="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <button className="btn btn-primary w-100 py-2" type="submit">
                {t('sign_in')}
              </button>
            </form>
            <div className="mt-3">
              <div className="d-flex justify-content-center links">
                {t('dont_have_account')}
                <Link to="/signup" className="text-primary ml-2">{t('sign_up')}</Link>
              </div>
              <div className="sign-with-google mt-2">
                <Link to={apiUrl + "oauth/auth/google"}>
                  <button className="btn btn-google btn-danger w-100">
                    {t('login_with_google')}
                  </button>
                </Link>
                <LanguageSelector />
              </div>
            </div>
          </main>
        </div>
      )}
    </Fragment>
  );
}

export default SignIn;

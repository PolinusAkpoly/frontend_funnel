/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 25/09/2023 12:51:05
*/
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthState, isAdminSelector } from '../../redux/selectors/selectors';
import { setItem } from '../../helpers/localsorage.service';

const AdminRoute = ({ children }: any) => {
  const isAuth = useSelector(getAuthState);
  const isAdmin = useSelector(isAdminSelector);
  const location = useLocation();

  if (!isAuth) {
    setItem("pathname", location.pathname);
    return <Navigate replace to="/signin" />;
  }

  if (!isAdmin) {
    return <Navigate replace to="/" />;
  }

  return children;
};

export default AdminRoute;


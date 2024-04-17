/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/01/2024 21:05:40
*/
import React, { FC, useEffect, useState } from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../../redux/actions/actionTypes';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../redux/selectors/selectors';
import { useDispatch } from 'react-redux';
import { getDatas } from '../../api/api-entity';


interface SideBarProps {
  model?: string
}


const SideBar: FC<SideBarProps> = ({ model }) => {

 
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()

  const [navItem, setNavItem] = useState<any[]>([])

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        const data = await getDatas('navitem')
        if(data.isSuccess){
          setNavItem(data.results)
        }
      }
      runLocalData()
    },[])

  const handleLogout = (event: any) => {
    event.preventDefault()
    dispatch({
      type: LOGOUT,
      payload: null
    })
  }

  return (
    <>
      <h1 className="visually-hidden">Sidebars examples</h1>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: 280 }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi pe-none me-2" width={40} height={32}><use xlinkHref="#bootstrap" /></svg>
          <span className="fs-4">Mudey</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {
            navItem?.map((item: any, index: number) => {
              return <li className="nav-item" key={index}>
                <Link to={"/admin" + item.path} className={"nav-link text-white " + (model == item.key ? 'active' : '')} aria-current="page">
                  <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#home" /></svg>
                  {item.name}
                </Link>
              </li>
            })
          }



          <li>
            <a href="/" className={"nav-link text-white  " + (model == 'home' ? 'active' : '')}>
              <svg className="bi pe-none me-2" width={16} height={16}><use xlinkHref="#people-circle" /></svg>
              Dashboard
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" width={32} height={32} className="rounded-circle me-2" />
            <strong>{user?.firstname}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            {/* <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li> */}
            {/* <li><Link className="dropdown-item" to="/dashboard">Compte</Link></li>
            <li><Link className="dropdown-item" to="/settings">Paramètres</Link></li>
            <li><a href='/admin' className="dropdown-item">Admin</a></li> */}
            <li>
              <a className="dropdown-item" onClick={handleLogout} href='#'>{t('Logout')}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="b-example-divider b-example-vr"></div>
    </>
  );
}

export default SideBar;
/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 26/01/2024 16:43:04
*/
import React, { FC, useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState, getCurrentUser, isAdminSelector } from '../../redux/selectors/selectors';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../redux/actions/actionTypes';


interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {

  const isAuth = useSelector(getAuthState)
  const isAdmin = useSelector(isAdminSelector);
  const { t } = useTranslation();
  const user = useSelector(getCurrentUser)
  const dispatch = useDispatch()
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleLogout = (event: any) => {
    event.preventDefault()
    dispatch({
      type: LOGOUT,
      payload: null
    })
  }

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className="flex-shrink-0 sticky-top">
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
          <Link className="navbar-brand" to="/" onClick={closeMenu}>Mudey Funnel</Link>
          <button
            className={`navbar-toggler ` + (isMenuOpen ? '' : 'collapsed')}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"
            /></button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">Pricing</Link>
              </li>

              {
                isAuth && user ?
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/tunnel">Tunnels</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='rounded-circle' src="/assets/images/profil.png" width={30} alt="" />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                        <li><Link className="dropdown-item" to="/dashboard">Compte</Link></li>
                        {/* <li><Link className="dropdown-item" to="/settings">Paramètres</Link></li> */}
                        {
                          isAdmin ?
                            <li><Link to='/admin' className="dropdown-item">Admin</Link></li>
                            :
                            null
                        }

                        <li>
                          <a className="dropdown-item" onClick={handleLogout} href='#'>{t('Logout')}</a>
                        </li>
                      </ul>
                    </li>
                  </>
                  :
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signin">{t('Login')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">{t('Register')}</Link>
                    </li>
                  </>
              }

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownBlog" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Blog</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownBlog">
                  <li><a className="dropdown-item" href="blog-home.html">Blog Home</a></li>
                  <li><a className="dropdown-item" href="blog-post.html">Blog Post</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" id="navbarDropdownPortfolio" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Portfolio</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownPortfolio">
                  <li><a className="dropdown-item" href="portfolio-overview.html">Portfolio Overview</a></li>
                  <li><a className="dropdown-item" href="portfolio-item.html">Portfolio Item</a></li>
                </ul>
              </li> */}
            </ul>
            <LanguageDropdown />

          </div>
        </div>
      </nav>
      {/* Header*/}

    </main>

  );
}

export default Header;
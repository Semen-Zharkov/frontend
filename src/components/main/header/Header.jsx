import { Link } from 'react-router-dom';
import React, { useRef, useContext } from 'react';
import './header.css';
import { logout } from '../../../scripts/logOut';
import { useAuth } from '../../../scripts/usersMe';
import siteLogo from '../../../img/icons/logo UDV group 1.png';
import arrow from '../../../img/icons/arrow_drop_down.svg';
import { FlagContext } from '../../../flagContext';

function Header() {
  const { isLoggedIn, isAuthChecked, userData } = useAuth();
  const { setFlagBtn } = useContext(FlagContext);
  const arrowClickRef = useRef(null);
  const visibilityListRef = useRef(null);

  const btnQuestionRef = useRef(null)
  const btnTestRef = useRef(null)

  const handleClickAnswer = (event) => {
    btnQuestionRef.current.classList.toggle('btn-add')
    setFlagBtn(true)
    event.preventDefault();
  }

  const handleClickTest= (event) => {
    btnTestRef.current.classList.toggle('btn-add')
    setFlagBtn(false)
    event.preventDefault();
  }

  const clickArrowLk = () => {
    if (arrowClickRef.current && visibilityListRef.current) {
      arrowClickRef.current.classList.toggle('click-arrow');
      visibilityListRef.current.classList.toggle('active');
    } else {
      console.error('Elements not found');
    }
  };

  if (!isAuthChecked) {
    return null;
  }

  return (
    <header className="page-header">
      <nav className="main-nav">
        <div className="site-navigation">
          <div className="site-navigation-item">
            <Link to="/" className="nav-udv">
              <img className="icon-logo" src={siteLogo} alt="Иконка логотипа 'UDV|Group'" />
            </Link>
          </div>
          <div className='site-navigation-item'>
            <div className="buttons">
              <>
                <Link  className="btn-question button button-header" onClick={handleClickAnswer} ref={btnQuestionRef}>
                  <p>Задать вопрос</p>
                </Link>
                <Link  className="btn-test button button-header" onClick={handleClickTest} ref={btnTestRef}>
                  <p>Пройти тест</p>
                </Link>
              </>
              {isLoggedIn ? (
                <>
                  <div className='container-lk'>
                    <div className="btn-user-lk" onClick={clickArrowLk}>
                      <div className='user-FIO'>
                        <p>{userData.surname}</p>
                        <p>{userData.name}</p>
                      </div>
                      <img className='btn-arrow' src={arrow} alt='' ref={arrowClickRef} />
                    </div>
                    <div className='nav-lk' ref={visibilityListRef}>
                      <Link to="/person_account" className="btn-signUp button-header"><p> Личные данные </p></Link>
                      <Link to="/work_documentation" className="btn-signUp button-header"><p> Документация </p></Link>
                      <Link className="btn-logOut" onClick={logout}><p> Выйти </p></Link>
                    </div>
                  </div>
                </>
              ) : (
                <div className='auth-container'>
                  <Link to="/logIn" className="btn-signUp button-header"><p> Войти </p></Link>
                  <p> | </p>
                  <Link to="/signUp" className="btn-signIp button-header"><p> Регистрация</p></Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
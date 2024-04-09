import { Link } from 'react-router-dom';
import React from 'react';
import './header.css';
import { logout } from '../../../scripts/logOut';
import { useAuth } from '../../../scripts/usersMe';

function Header() {
    const { isLoggedIn, isAuthChecked } = useAuth(); // Используем новое состояние isAuthChecked для проверки завершения запроса на авторизацию

    if (!isAuthChecked) {
        // Если проверка авторизации еще не завершена, ничего не отображаем
        return null;
    }

    return (
        <header className="page-header">
            <nav className="main-nav">
                <ul className="site-navigation">
                    <li className="site-navigation-item">    
                        <a href="/" className="nav-gigaShad"> UDV LLM </a>
                    </li>
                    <li className="site-navigation-item">    
                        <a href="#aboutProject-text" className="nav-about-project"> О проекте</a>
                    </li>
                    <li className="button">
                        {isLoggedIn ? (
                            <>
                                <Link to="/upload_file" className="btn-upload button"> <p>Загрузить файл</p> </Link>
                                <Link to="/request_test" className="btn-request-test button"> <p>Задать тест</p> </Link>
                                <Link to="/request_answer_questions" className="btn-request-answer button"> <p>Задать вопрос</p> </Link>
                                <Link to="/person_account" className="btn-user-lk button">
                                    <p>Личный кабинет</p>
                                </Link>
                                <Link className="btn-logOut button" onClick={logout}>
                                    <p>Log out</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signUp" className="btn-signUp button">
                                    <p>Sign Up</p>
                                </Link>
                                <Link to="/logIn" className="btn-signIp button">
                                    <p>Log In</p>
                                </Link>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
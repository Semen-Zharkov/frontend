import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './header.css';
import {LogoutComponent} from '../../../scripts/logOut';
import { useAuth } from '../../../scripts/usersMe';

function Header(){
    const {isLoggedIn, setIsLoggedIn, userData} = useAuth() // Состояние isLoggedIn

    // Вызов функции RequestUserInformation для получения информации о состоянии авторизаци
    


    return (
        <header class="page-header">
            <nav class="main-nav">
                <ul class="site-navigation">
                    <li class="site-navigation-item">    
                        <a href="/" class="nav-gigaShad"> UDV LLM </a>
                    </li>
                    <li class="site-navigation-item">    
                        <a href="#aboutProject-text" class="nav-about-project"> О проекте</a>
                    </li>
                    <li class="button">
                        <Link to="/upload_file" class="btn-upload" className="button"> <p>Загрузить файл</p> </Link>
                        <Link to="/request_test" class="btn-request-test" className="button"> <p>Задать тест</p> </Link>
                        <Link to="/request_answer_questions" class="btn-request-answer" className="button"> <p>Задать вопрос</p> </Link>
                        {!isLoggedIn &&(<Link to="/signUp" class="btn-signUp"  className="button">
                                <p>Sign Up</p>
                        </Link>)}
                        {!isLoggedIn &&(<Link to="/logIn" class="btn-signIp"  className="button">
                                <p>Log In</p>
                        </Link>)}
                        {isLoggedIn &&(<Link to="/" class="btn-logOut" onClick={LogoutComponent}  className="button">
                                <p>Log out</p>
                        </Link>)}
                        {isLoggedIn &&(<Link to="/person_account" class="btn-user-lk"  className="button">
                                <p>Личный кабинет</p>
                        </Link>)}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;
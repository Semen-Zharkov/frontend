import { Link } from 'react-router-dom';
import './header.css'


const Header = () =>{
    fetch('http://localhost:8000/users/me', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer <your_access_token>'
    }
    })
    .then(response => response.json())
    .then(data => {
    // Обработка данных об авторизованном пользователе
    console.log(data);
    })
    .catch(error => {
    console.error('Ошибка:', error);
    });


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
                    <li>
                        <div class="button">
                            <Link to="/request" class="btn-request" href='test.html' className="button"> <p>Задать тест</p> </Link>
                            <Link to="/test" class="btn-test" href='request.html' className="button"> <p>Задать вопрос</p> </Link>
                            <Link to="/signUp" class="btn-signUp"  className="button">
                                 <p>Sign Up</p>
                            </Link>
                            <Link to="/logIn" class="btn-signIp"  className="button">
                                 <p>Sign In</p>
                            </Link>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
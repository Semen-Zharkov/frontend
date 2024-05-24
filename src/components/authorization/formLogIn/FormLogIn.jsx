import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './formLogIn.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../scripts/usersMe';
import btnPass from '../../../img/icons/password/Visibility=True.svg';
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg';

async function verifyToken(token) {
    const apiUrl = process.env.REACT_APP_API_URL;
    // Здесь должна быть логика проверки токена
    // Например, запрос на ваш сервер для проверки токена
    try {
        const response = await fetch(`${apiUrl}/auth/verify/${token}`, {
            method: "GET",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        else alert('Верификация прошла успешно!');
    } catch (error) {
        console.error("Error fetching user data:", error);
    } finally {
        
    }
    return false;
}

function VerifyUserComponent({ token, onVerificationComplete }) {
    useEffect(() => {
        const validate = async () => {
            const isValid = await verifyToken(token);
            if (isValid) {
                alert('Token is valid!');
            }
            onVerificationComplete();
        };
        validate();
    }, [token, onVerificationComplete]);

    return null;
}

export default function FormLogIn() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [verificationComplete, setVerificationComplete] = useState(!token);
    const [currentImage, setCurrentImage] = useState(btnPass);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const onClickEye = () => {
        setCurrentImage(currentImage === btnPass ? btnPassVisib : btnPass);
        setInputType(inputType === 'text' ? 'password' : 'text');
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'grant_type': '',
                    'username': data.username,
                    'password': data.password,
                    'scope': '',
                    'client_id': '',
                    'client_secret': '',
                }).toString(),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/');
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <section className='container-log-in'>
            {token && !verificationComplete && (
                <VerifyUserComponent
                    token={token}
                    onVerificationComplete={() => setVerificationComplete(true)}
                />
            )}
            {verificationComplete && (
                <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Вход</h2>
                    <div className='form-container-brim'>
                        <div className='block-username'>
                            <label className='username' htmlFor="username">Почта</label>
                            <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />
                        </div>
                        <div className='block-password'>
                            <label htmlFor="password">Пароль</label>
                            <input {...register("password")} className='js-input-password' type={inputType} value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />
                            <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' fill='none' />
                        </div>
                        <button className='submit-form' type="submit">Войти</button>
                    </div>
                    <Link to="/forgot_password" className="btn-forgot"> <p>Не помню пароль</p> </Link>
                    <div className='block-registr'>
                        <p>Нет аккаунта?</p>
                        <Link to="/signUp" className="btn-registr"> <p>Зарегистрируйтесь</p> </Link>
                    </div>
                </form>
            )}
        </section>
    );
}
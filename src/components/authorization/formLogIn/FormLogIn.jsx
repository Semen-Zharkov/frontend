import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formLogIn.css';
import { Link, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../scripts/usersMe';
import { useNavigate } from 'react-router-dom';
import btnPass from '../../../img/icons/password/Visibility=True.svg'
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg'

export default function FormLogIn() {
    const [currentImage, setCurrentImage] = useState(btnPass);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');

    const inputPass = document.querySelector('.js-input-password')

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const onClickEye = () =>{
        setCurrentImage(currentImage === btnPass ? (btnPassVisib): (btnPass));
        setInputType(inputType === 'text' ? 'password' : 'text');
    }
    
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'grant_type': '',
                    'username': data['username'],
                    'password': data['password'],
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
    }

    return (
        <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Вход</h2>
            <div className='form-container-brim'>
                <div className='block-username'>
                    <label className='username' htmlFor="username">Почта</label>
                    <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />
                </div>
                <div className='block-password'>
                    <label htmlFor="password">Пароль</label>
                    <input {...register("password")} class='js-input-password' type={inputType} value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />
                    
                    <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' fill='none'/>
                </div>
                <button className='submit-form' type="submit">Войти</button>
            </div>
            <Link to="/forgot_password" className="btn-forgot"> <p>Не помню пароль</p> </Link>
            <div className='block-registr'>
                <p>Нет аккаунта?</p>
                <Link to="/signUp" className="btn-registr"> <p>Зарегистрируйтесь</p> </Link>
            </div>
        </form>
    );
}
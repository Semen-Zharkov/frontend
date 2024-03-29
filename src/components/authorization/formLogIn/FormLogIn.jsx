import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formLogIn.css';
import axios from 'axios';
import { Link, Route, Navigate} from 'react-router-dom';
import { useAuth } from '../../../scripts/usersMe';
import { Redirect } from 'react-router-dom';

export default function FormLogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {isLoggedIn, insStateLogInTrue } = useAuth(); // Используем хук useAuth здесь
    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();


    const onSubmit = async (data) => {
        // Отправка запроса на вход
        axios.post(`${apiUrl}/auth/login`, new URLSearchParams({
            'grant_type': '',
            'username': data['username'],
            'password': data['password'],
            'scope': '',
            'client_id': '',
            'client_secret': '',
        }), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            // Проверка успешности запроса на вход
            if (response.status !== 204) {
                throw new Error('Network response was not ok');
            }
            insStateLogInTrue(); // Устанавливаем статус авторизации в true
            // Сброс значений полей
        }).catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }
    return (
        <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Форма авторизации</h2>

            <label htmlFor="username">Email:</label>
            <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />

            <label htmlFor="password">Пароль:</label>
            <input {...register("password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    );
}
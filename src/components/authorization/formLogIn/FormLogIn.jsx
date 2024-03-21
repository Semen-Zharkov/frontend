import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formLogIn.css';
import axios from 'axios';

export default function FormLogIn() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState('');
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
        })
            .then(response => {
                setIsLoggedIn('true')
                // Проверка успешности запроса на вход
                if (response.status !== 204) {
                    throw new Error('Network response was not ok');
                }
                fetch(`${apiUrl}/users/me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }}).then(response => {
                        if(response.status!==200){
                            throw new Error('Network response was not ok');
                        }
                        
                        
                    }).catch(error => {
                        console.error('There was a problem with your fetch operation:', error);
                    })

                // Сброс значений полей
                reset();
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    }

    return(
        <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Форма авторизации</h2>

            <label htmlFor="username">Email:</label>
            <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />

            <label htmlFor="password">Пароль:</label>
            <input {...register("password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    )
}


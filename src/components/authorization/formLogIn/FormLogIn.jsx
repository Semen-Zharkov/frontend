import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formLogIn.css';
import { Link, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../scripts/usersMe';
import { useNavigate } from 'react-router-dom';

export default function FormLogIn() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

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
            <h2>Форма авторизации</h2>

            <label htmlFor="username">Email:</label>
            <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />

            <label htmlFor="password">Пароль:</label>
            <input {...register("password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    );
}
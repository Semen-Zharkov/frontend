import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './signUp.css'


function FormSignUp(){

    const [token, setToken] = useState('');
    const{
        register,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        try {
        fetch('http://127.0.0.1:8000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        if (Response.ok) {
            // Если регистрация прошла успешно, получаем токен из ответа
            const data = await Response.json();
            const token = data.token;
    
            // Сохраняем токен в локальное хранилище
            localStorage.setItem('token', token);
    
            // Обновляем состояние компонента с токеном
            setToken(token);
          } else {
            // Обработка ошибок при регистрации
            console.error('Ошибка при регистрации:', Response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
    }

    return (
        <div class="container">
            <h2>Регистрация</h2>
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <label for="last-name">Фамилия:</label>
                <input {...register("surname")} type="text" id="last-name" required />

                <label for="first-name">Имя:</label>
                <input {...register("name")} type="text" id="first-name" required />

                <label for="email">Email:</label>
                <input {...register("email")} type="email" id="email" name="email" required />

                <label for="password">Пароль:</label>
                <input {...register("password")} type="password" id="password" name="password" required />

                <label for="confirm-password">Подтверждение пароля:</label>
                <input {...register("confirmation_password")} type="password" id="confirm-password" required />

                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
}

export default FormSignUp;
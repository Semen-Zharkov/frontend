import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './signUp.css'


function FormSignUp(){

    const apiUrl = process.env.REACT_APP_API_URL;

    const [token, setToken] = useState('');
    const{
        register,
        reset,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then(response => {
            alert('Вы успешно зарегистрировались')
            reset()
            
          })
        .catch (error => {
          console.error('Ошибка при регистрации:', error);
        })
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
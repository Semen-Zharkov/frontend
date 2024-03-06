import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './formLogIn.css';


function FormLogIn(){
    const{
        register,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        fetch('http://127.0.0.1:8000/auth/login',{
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
        }),
        })
        .then(response => {
            localStorage.setItem('isAuthenticated', 'true');
        })
        .catch(error => {
        });
    }


    return (
        <form class="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Форма авторизации</h2>

            <label for="username">Email:</label>
            <input {...register("username")} type="email" id="username" name="username" required />

            <label for="password">Пароль:</label>
            <input {...register("password")} type="password" id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    );

}
export default FormLogIn;
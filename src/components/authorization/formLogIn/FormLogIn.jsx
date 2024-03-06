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
        fetch('http://127.0.0.1:8000',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => {
        })
        .catch(error => {
        });
    }


    return (
        <form class="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Форма авторизации</h2>

            <label for="email">Email:</label>
            <input {...register("email")} type="email" id="email" name="email" required />

            <label for="password">Пароль:</label>
            <input {...register("password")} type="password" id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    );

}
export default FormLogIn;
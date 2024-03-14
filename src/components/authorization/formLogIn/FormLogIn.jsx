import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './formLogIn.css';


function FormLogIn(){
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const{
        register,
        reset,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
    // Отправка запроса на вход
    fetch('https://3c59-5-165-8-39.ngrok-free.app/auth/login',{
        method: 'POST',
        credentials: 'include',
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
        })
    })
    .then(response => {
        // Проверка успешности запроса на вход
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Если запрос на вход выполнен успешно, отправляем запрос на /users/me
        fetch('https://3c59-5-165-8-39.ngrok-free.app/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Установка Content-Type на application/json
            },
        }).then(response => {
            if (!response.ok) {
              throw new Error('Ошибка HTTP: ' + response.status);
            }
            // Преобразование ответа в формат JSON
            return response.json();
          })
          .then(data => {
            // Обработка полученных данных
            alert(`Добро пожаловать ${data.name} ${data.surname}`)
            // Здесь вы можете обновить состояние компонента или выполнить другие действия с полученными данными

          })
          .catch(error => {
            // Обработка ошибок
            console.error('Ошибка при выполнении запроса:', error);
          });
    })
    .then(response => {
        // Обработка ответа на запрос /users/me
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        reset()
        
    })
    .then(data => {
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
}

    return (
        <form class="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <h2>Форма авторизации</h2>

            <label for="username">Email:</label>
            <input {...register("username")} type="email" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" required />

            <label for="password">Пароль:</label>
            <input {...register("password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required />

            <button type="submit">Войти</button>
        </form>
    );

}
export default FormLogIn;
import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import './formLogIn.css';


function FormLogIn(){
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const{
        register,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async () => {
        try {
        fetch('http://127.0.0.1:8000/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ username, password }),
        })
        if (Response.ok) {
            // Если вход прошел успешно, получаем токен из ответа
            const data = await Response.json();
            const token = data.token;
    
            // Сохраняем токен в локальное хранилище
            localStorage.setItem('token', token);
    
            // Обновляем состояние компонента с токеном
            setToken(token);
    
            // Получаем данные пользователя
            const userDataResponse = await fetch('http://127.0.0.1:8000/user/me', {
              method: 'Get',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const userData = await userDataResponse.json();
    
            // Здесь можно выполнить какие-то действия с данными пользователя, например, их отобразить
            console.log('Данные пользователя:', userData);
          } else {
            // Обработка ошибок при входе пользователя
            console.error('Ошибка при входе:', Response.statusText);
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
      };


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
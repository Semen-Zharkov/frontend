import { RequestUserMe } from "./usersMe";
import { Navigate, Link } from "react-router-dom";
import React, { useState } from "react";

export function LogoutComponent(){
    const apiUrl = process.env.REACT_APP_API_URL;

    const logout = async () => {
        
        try {
            // Отправка запроса на выход пользователя
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
            });
            // setIsLoggedIn(false);
            // Проверка успешности выполнения запроса на выход
            if (response.ok) {
                console.log('User logged out successfully');
                return <Navigate to='/' replace={true}/>
                // Выполните здесь необходимые действия после выхода пользователя (например, перенаправление на страницу входа)
            } else {
                console.error('Logout request failed');
                <Link to='/' />
            }
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
    logout();

}

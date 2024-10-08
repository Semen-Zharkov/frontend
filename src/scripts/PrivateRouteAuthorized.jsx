import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';

export const PrivateRouteAuthorized = () => {
  // Проверяем аутентификацию пользователя
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    return(
        !userData? <Outlet /> : <Navigate to="/person_account" />
    );
}
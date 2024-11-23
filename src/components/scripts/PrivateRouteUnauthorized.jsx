import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet} from 'react-router-dom';
export const PrivateRouteUnauthorized = () => {
  // Проверяем аутентификацию пользователя
  const userData = useSelector(state => state.updateUser)
  const lengthUserData = Object.keys(userData).length
  console.log(32, userData)
  console.log(32, lengthUserData)
    return(
      lengthUserData!==0? <Outlet /> : <Navigate to="/logIn" />
    );
}

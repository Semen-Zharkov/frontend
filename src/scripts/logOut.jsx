import React from 'react';

export function LogoutComponent(){
    // Удаляем токен из локального хранилища
    fetch('https://553f-5-165-8-39.ngrok-free.app/auth/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Установка Content-Type на application/json
      }})
      return
}

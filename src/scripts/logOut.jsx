import React from 'react';

const LogoutComponent = () => {
  const handleLogout = () => {
    // Удаляем токен из локального хранилища
    localStorage.removeItem('token');
    // Дополнительно можно выполнить какие-то действия, например, перенаправление на страницу входа или обновление интерфейса
  }
  return;
}
export default LogoutComponent;
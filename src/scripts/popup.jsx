import React, { useEffect } from 'react';

export const Popup = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose(); // Закрытие попапа через 3 секунды
      }, 3000);
    }
    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
};


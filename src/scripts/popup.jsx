import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Popup = ({ isOpen, message, urlNavigate, onClose, setDisabledButton, setFlag}) => {
  const navigate = useNavigate();
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        navigate(urlNavigate);
        setDisabledButton(false)
        setFlag(false)
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


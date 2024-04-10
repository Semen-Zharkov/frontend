import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import '../../components/personArea/mainPersonArea/informationUser.css';
import { AcceptRequest } from './acceptRequest';
import { RejectRequest } from './rejectRequest';

const UserVerification = ({ onClick }) => {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrlFront = process.env.REACT_APP_API_FRONT_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();


    const toggleDropdown = async () => {
        if (!isOpen) {
            try {
                // Отправка запроса при открытии списка
                const response = await fetch(`${apiUrl}/admin/requests`, {
                    method: 'GET',
                    credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
                });
                if (response.ok) {
                    setData(await response.json());
                } else {
                    console.error('Проблема поиска');
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        setIsOpen(!isOpen);
    };

    const acceptRequest = (id) =>{
        AcceptRequest(id)
    }

    const rejectRequest = (id) =>{
        RejectRequest(id)
    }


    return (
        <div className="dropdown-container">
            <div className="dropdown">
                <button onClick={toggleDropdown}>Пользователи на верефикацию</button>
                {isOpen && data.length > 0 && (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                {item['info'].name} {item['info'].surname} <br/>
                                {item['info'].email}
                                <button onClick={()=>(acceptRequest(item['id']))}>Принять</button>
                                <button onClick={()=>(rejectRequest(item['id']))}>Отклонить</button>
                            </li>
                        ))}
                    </ul>
                )}
                {isOpen && data.length === 0 && (
                    <div>Нет пользователей на верефикацию</div>
                )}
            </div>
        </div>
    );
}

export default UserVerification;
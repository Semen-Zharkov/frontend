import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './informationUser.css';
import UserVerification from '../../verification/userVerification';
import btnEdit from '../../../../img/edit.svg';
import Leaderboard from '../leaderboard/Leaderboard';
import { Popup } from '../../popups/popup';
import UpdateUserData from './UpdateUserData';
import UpdatePassword from './UpdatePassword';

const InformationUser = () => {
    const userData = useSelector(state => state.updateUser) || null; 
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSave, setIsEditingSave] = useState(false);
    const [flag,setFlag] = useState(false);
    const [message, setMessage] = useState('');


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditClickSave = () => {
        setIsEditingSave(true);
    };
    return (
        <section className='container-person-area'>
            {flag && <Popup isOpen={flag} message={message} setFlag={setFlag}/>}
            <div className='person-area-user'>
                <h2>Личные данные</h2>
                {!isEditingSave ? (
                    <>
                        {userData.is_superuser ? (
                            <div className='admin-panel'>
                                <div className='user-information'>
                                    <div className='user-img'></div>
                                    <div className='inform-list'>
                                        <div className='inform-list-item'>
                                            <div>{userData.name} {userData.surname}</div>
                                            <div>{userData.email}</div>
                                            <div>Админ</div>
                                        </div>
                                        <a onClick={handleEditClickSave}>
                                            <img src={btnEdit} alt='Edit' />
                                        </a>
                                    </div>
                                </div>
                                <div className='verification-container'>
                                    <UserVerification />
                                </div>
                            </div>
                        ) : (
                            <div className='user-information'>
                                <div className='user-img'></div>
                                <div className='inform-list'>
                                    <div className='inform-list-item'>
                                        <div>{userData.name} {userData.surname}</div>
                                        <div>{userData.email}</div>
                                        <div>Сотрудник компании</div>
                                    </div>
                                    <a onClick={handleEditClickSave}>
                                        <img src={btnEdit} alt='Edit' />
                                    </a>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <UpdateUserData setIsEditingSave={setIsEditingSave}/>
                )}
            </div>
            {!isEditing ? (
                <div className='user-edit'>
                    <h3>Пароль</h3>
                    <div className='container-edit-btn'>
                        <button className='edit-password button' onClick={handleEditClick}>
                            Изменить
                        </button>
                    </div>
                </div>
            ) : (
                <UpdatePassword setIsEditing={setIsEditing} setFlag={setFlag} setMessage={setMessage}/>
            )}
            <Leaderboard />
        </section>
    );
};

export default InformationUser;

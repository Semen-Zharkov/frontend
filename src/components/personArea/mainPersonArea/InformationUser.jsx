import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './informationUser.css';
import {useAuth} from '../../../scripts/usersMe'

const InformationUser = () => {
    const {isLoggedIn, setIsLoggedIn, userData} = useAuth() // Состояние isLoggedIn
    return (
        <section className='account-information'>
            <ul class='inform-list'>
                <li class='inform-list-item'> Имя: {userData.name} </li>
                <li class='inform-list-item'> Фамилия: {userData.surname} </li>
                <li class='inform-list-item'> Электронная почта: {userData.email} </li>
                <li class='inform-list-item'> Сотрудник компании: {userData.company_representative}</li>
            </ul>
        </section>        
)
}
export default InformationUser;
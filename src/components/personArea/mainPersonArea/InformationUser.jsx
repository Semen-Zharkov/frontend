import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './informationUser.css';
import {useAuth} from '../../../scripts/usersMe'
import UserVerification from '../../../scripts/verification/userVerification';
import ListFitback from '../../../scripts/listFitback/ListFitback'
import SeachForDocumentation from '../../seachForDocumentation/SeachForDocumentation';

const InformationUser = () => {

    
    const {userData} = useAuth() // Состояние isLoggedIn
    return(userData.is_superuser
    ?(
        <section className='account-information'>
            <ul class='inform-list'>
                <li class='inform-list-item'> Имя: {userData.name} </li>
                <li class='inform-list-item'> Фамилия: {userData.surname} </li>
                <li class='inform-list-item'> Электронная почта: {userData.email} </li>
                <li class='inform-list-item'> Админ</li>
            </ul>
            <SeachForDocumentation />
            <UserVerification />
            <ListFitback />
        </section>)
    :(
        <section className='account-information'>
            <ul class='inform-list'>
                <li class='inform-list-item'> Имя: {userData.name} </li>
                <li class='inform-list-item'> Фамилия: {userData.surname} </li>
                <li class='inform-list-item'> Электронная почта: {userData.email} </li>
                <li class='inform-list-item'> Сотрудник компании</li>
            </ul>
            <SeachForDocumentation />
        </section>)      
    )   
}
export default InformationUser;
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
    return(
        <section className='container-person-area'>
            <div className='person-area-title'>
                <h2>Личные данные</h2>
            </div>
            <div className='person-area-user'>
            <>
            {userData.is_superuser?(
                <div className='user-information'>
                    <div className='user-img'>

                    </div>
                    <ul class='inform-list'>
                        <li class='inform-list-item'> {userData.name} {userData.surname} </li>
                        <li class='inform-list-item'> {userData.email} </li>
                        <li class='inform-list-item'> Админ</li>
                    </ul>
                    {/* <SeachForDocumentation />
                    <UserVerification /> */}
                    {/* <ListFitback /> */}
                </div>)
            :(
                <div className='user-information'>
                    <div className='user-img'>

                    </div>
                    <ul class='inform-list'>
                        <li class='inform-list-item'> {userData.name} {userData.surname} </li>
                        <li class='inform-list-item'> {userData.email} </li>
                        <li class='inform-list-item'> Сотрудник компании </li>
                    </ul>
                    {/* <SeachForDocumentation /> */}
                </div>)}
            </>
            </div>
            <div className='user-edit'>
                <div className='container-edit-info'>
                    <h3>Пароль</h3>
                    <p>Последние изменения 13 янв. 2024 г.</p>
                </div>
                <div className='container-edit-btn'>
                    <button className='edit-password button'>Изменить</button>
                </div>
            </div>
        </section>
    )   
}
export default InformationUser;
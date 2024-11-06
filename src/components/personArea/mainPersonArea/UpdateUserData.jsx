import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { surnameValidator } from '../../../scripts/validation/surname';
import { nameValidator } from '../../../scripts/validation/name';
import { emailRegistrationValidator } from '../../../scripts/validation/email';
import { useState } from 'react';
import { useResetPasswordMutation } from '../../store/services/users';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/editUserData';
const UpdateUserData = ({setIsEditingSave}) => {
    const userData = JSON.parse(localStorage.getItem('userData')) || null; 
    const [serverErrorEmail, setServerErrorEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const editSchema = yup.object().shape({
        surname: surnameValidator,
        name: nameValidator,
        email: emailRegistrationValidator,
      });
      const selector = useSelector(state => state.updateUser.editUser)
      const dispatch = useDispatch()
    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        reset: resetEdit,
        formState: { errors: editErrors }
      } = useForm({
        resolver: yupResolver(editSchema),
    });
    
    const [userResetData, {
        error: errorResetUser, status: statusResetUser
    }] = useResetPasswordMutation();
    const onSubmitEdit = async (data) => {
        await userResetData({data});      
    };

    const handleCancelEdit = () => {
        resetEdit({
            surname: userData.surname,
            name: userData.name,
            email: userData.email,
        });
        setIsEditingSave(false);
        setServerErrorEmail('');
    };
    console.log(statusResetUser)
    useEffect(()=>{
        console.log(selector)
        dispatch(updateUser({surname, name, email}))
        if(statusResetUser==='fulfilled'){
            setIsEditingSave(false);
        } 
    },[statusResetUser, selector])
    return (
        <form className="form-container edit-form" onSubmit={handleSubmitEdit(onSubmitEdit)}>
            <div className='form-container-brim'>
                <div className='block-surname'>
                    <label htmlFor="last-name">Фамилия</label>
                    <input {...registerEdit("surname")} type="text" id="last-name" defaultValue={userData.surname || ''} onChange={(e)=>setSurname(e.target.value)}/>
                    {editErrors.surname && <p className='form-validation' style={{ color: 'red' }}>{editErrors.surname.message}</p>}
                </div>
                <div className='block-username'>
                    <label htmlFor="first-name">Имя</label>
                    <input {...registerEdit("name")} type="text" id="first-name" defaultValue={userData.name || ''} onChange={(e)=>setName(e.target.value)} />
                    {editErrors.name && <p className='form-validation' style={{ color: 'red' }}>{editErrors.name.message}</p>}
                </div>
                <div className='block-email'>
                    <label htmlFor="email">Почта</label>
                    <input {...registerEdit("email")} type="email" id="email" defaultValue={userData.email || ''} onChange={(e)=>setEmail(e.target.value)} />
                    {editErrors.email && <p className='form-validation' style={{ color: 'red' }}>{editErrors.email.message}</p>}
                    {serverErrorEmail && <p className='form-validation' style={{ color: 'red' }}>{serverErrorEmail}</p>}
                </div>
                <div className='container-button'>
                    <button className='submit-form' type="submit">Сохранить</button>
                    <button type="button" className="button" onClick={handleCancelEdit}>Отменить</button>
                </div>
            </div>
        </form>
    )
}

export default UpdateUserData

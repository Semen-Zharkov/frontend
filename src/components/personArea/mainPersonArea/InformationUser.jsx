import React, { useState } from 'react';
import './informationUser.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/editUserData';
import UserVerification from '../../../scripts/verification/userVerification';
import btnPass from '../../../img/icons/password/Visibility=True.svg';
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg';
import btnEdit from '../../../img/edit.svg';
import Leaderboard from '../leaderboard/Leaderboard';
import { surnameValidator } from '../../../scripts/validation/surname';
import { nameValidator } from '../../../scripts/validation/name';
import { emailRegistrationValidator } from '../../../scripts/validation/email';
import { confirmPasswordValidator } from '../../../scripts/validation/password';
import { passwordValidator } from '../../../scripts/validation/password';
import { Popup } from '../../../scripts/popup';
import { useResetPasswordMutation } from '../../store/services/users';
import UpdateUserData from './UpdateUserData';

const editSchema = yup.object().shape({
  surname: surnameValidator,
  name: nameValidator,
  email: emailRegistrationValidator,
});

const passwordSchema = yup.object().shape({
  old_password: passwordValidator,
  password: passwordValidator,
  confirmation_password: confirmPasswordValidator,
});

const InformationUser = () => {
    const userData = JSON.parse(localStorage.getItem('userData')) || null;   
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSave, setIsEditingSave] = useState(false);
    const [password, setPassword] = useState('');
    const [flag,setFlag] = useState(false);
    const [message, setMessage] = useState('');
    const [old_password, setCurrentPassword] = useState('');
    const [confirmation_password, setConfirmPassword] = useState('');
    const [currentImage, setCurrentImage] = useState(btnPass);
    const [inputType, setInputType] = useState('password');
    const [currentCurrentImage, setCurrentCurrentImage] = useState(btnPass);
    const [inputCurrentType, setInputCurrentType] = useState('password');
    const [currentConfirmImage, setCurrentConfirmImage] = useState(btnPass);
    const [inputConfirmType, setInputConfirmType] = useState('password');
    const [serverErrorEmail, setServerErrorEmail] = useState('');
    const [serverErrorPassword, setServerErrorPassword] = useState('');
    const [userResetDataPassword, {
        error: errorPassword, status: statusPassword
    }] = useResetPasswordMutation()
    

    const {
      register: registerPassword,
      handleSubmit: handleSubmitPassword,
      reset: resetPassword,
      formState: { errors: passwordErrors }
    } = useForm({
      resolver: yupResolver(passwordSchema),
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditClickSave = () => {
        setIsEditingSave(true);
    };


    const handleCancelPassword = () => {
        resetPassword({
            old_password: '',
            password: '',
            confirmation_password: '',
        });
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
        setIsEditing(false);
        setServerErrorPassword('');
    };


    const onSubmitPassword = async (data) => {
        await userResetDataPassword({data}); 
        if (errorPassword) {
            setServerErrorPassword(errorPassword);
        }
        if(statusPassword==='fulfilled'){
            setIsEditing(false);
        }
    };
    const handleClose = () => {
        setFlag(false)
        window.location.reload();
      };

    const onClickEye = () => {
        setCurrentImage(currentImage === btnPass ? btnPassVisib : btnPass);
        setInputType(inputType === 'text' ? 'password' : 'text');
    };

    const onClickConfirmEye = () => {
        setCurrentConfirmImage(currentConfirmImage === btnPass ? btnPassVisib : btnPass);
        setInputConfirmType(inputConfirmType === 'text' ? 'password' : 'text');
    };

    const onClickCurrentEye = () => {
        setCurrentCurrentImage(currentCurrentImage === btnPass ? btnPassVisib : btnPass);
        setInputCurrentType(inputCurrentType === 'text' ? 'password' : 'text');
    };
    return (
        <section className='container-person-area'>
            {flag && <Popup isOpen={flag} message={message} onClose={handleClose}/>}
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
                <form className="form-container edit-form password-form" onSubmit={handleSubmitPassword(onSubmitPassword)}>
                    <div className='container-edit-info'>
                        <h3>Изменение пароля</h3>
                    </div>
                    <div className='block-current-password password'>
                        <label htmlFor="old_password">Текущий пароль</label>
                        <input {...registerPassword("old_password")} className='js-input-current-password' value={old_password} onChange={(e) => {setServerErrorPassword(''); setCurrentPassword(e.target.value)}} type={inputCurrentType} id="current-password" name="old_password" />
                        <img onClick={onClickCurrentEye} className='btn__pass js-btn-password' src={currentCurrentImage} alt='' />
                        {passwordErrors.old_password && <p className='form-validation' style={{ color: 'red' }}>{passwordErrors.old_password.message}</p>}
                        {serverErrorPassword && <p className='form-validation' style={{ color: 'red' }}>{serverErrorPassword}</p>}
                    </div>
                    <div className='block-password password'>
                        <label htmlFor="password">Новый пароль</label>
                        <input {...registerPassword("password")} className='js-input-password' value={password} onChange={(e) => setPassword(e.target.value)} type={inputType} id="password" name="password" />
                        <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' />
                        {passwordErrors.password && <p className='form-validation' style={{ color: 'red' }}>{passwordErrors.password.message}</p>}
                    </div>
                    <div className='block-confirm-password password'>
                        <label htmlFor="confirmation_password">Повторите новый пароль</label>
                        <input {...registerPassword("confirmation_password")} className='js-input-confirm-password' value={confirmation_password} onChange={(e) => setConfirmPassword(e.target.value)} type={inputConfirmType} id="confirm-password" name='confirmation_password' />
                        <img onClick={onClickConfirmEye} className='btn__pass js-btn-password' src={currentConfirmImage} alt='' />
                        {passwordErrors.confirmation_password && <p className='form-validation' style={{ color: 'red' }}>{passwordErrors.confirmation_password.message}</p>}
                    </div>
                    <div className='container-button'>
                        <button type="submit" className="btn-add">Отправить</button>
                        <button type="button" className="button" onClick={handleCancelPassword}>Отменить</button>
                    </div>
                </form>
            )}
            <Leaderboard />
        </section>
    );
};

export default InformationUser;

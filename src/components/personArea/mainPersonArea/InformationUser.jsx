import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './informationUser.css';
import {useForm} from 'react-hook-form';
import { useAuth } from '../../../scripts/usersMe';
import UserVerification from '../../../scripts/verification/userVerification';
import btnPass from '../../../img/icons/password/Visibility=True.svg'
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg'
import btnEdit from '../../../img/edit.svg'
import { ResetPasswordLK} from '../../forgotPassword/resetPassword/ResetPasswordLK';

const InformationUser = () => {
    const navigate = useNavigate();
    const { userData } = useAuth(); // Состояние isLoggedIn
    const [isEditing, setIsEditing] = useState(false); // Состояние для управления видимостью блоков
    const [password, setPassword] = useState('');
    const [old_password, setCurrentPassword] = useState('');
    const [confirmation_password, setConfirmPassword] = useState('');
    const [currentImage, setCurrentImage] = useState(btnPass);
    const [inputType, setInputType] = useState('password');
    const [isEditingSave, setIsEditingSave] = useState(false);
    const [currentCurrentImage, setCurrentCurrentImage] = useState(btnPass);
    const [inputCurrentType, setInputCurrentType] = useState('password');

    const [currentConfirmImage, setCurrentConfirmImage] = useState(btnPass);
    const [inputConfirmType, setInputConfirmType] = useState('password');
    
    const {
        register,
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful }
    } = useForm();

    const handleEditClick = () => {
        setIsEditing(true); // Показываем форму для изменения пароля
    };

    const handleSubmitForm = (data) => {
        ResetPasswordLK(data)
        // Логика отправки формы
    };
    
    const handleCancel = () =>{
        reset({
            old_password: '',
            password: '',
            confirmation_password: '',
        });
        setIsEditing(false);
    }
    const onSubmit = (e) => {
      ResetPasswordLK(e)
      // Логика сохранения данных
      
      setIsEditingSave(false); // Скрыть форму после сохранения
    };

    const handleEditClickSave = () => {
        setIsEditingSave(true); // Показать форму для редактирования
      };

    const onClickEye = () =>{
        setCurrentImage(currentImage === btnPass ? (btnPassVisib): (btnPass));
        setInputType(inputType === 'text' ? 'password' : 'text');
    }
    const onClickConfirmEye = () =>{
        setCurrentConfirmImage(currentConfirmImage === btnPass ? (btnPassVisib): (btnPass));
        setInputConfirmType(inputConfirmType === 'text' ? 'password' : 'text');
    }

    const onClickCurrentEye = () =>{
        setCurrentCurrentImage(currentCurrentImage === btnPass ? (btnPassVisib): (btnPass));
        setInputCurrentType(inputCurrentType === 'text' ? 'password' : 'text');
    }

  return (
    <section className='container-person-area'>
      <div className='person-area-title'>
        <h2>Личные данные</h2>
      </div>
      <div className='person-area-user'>
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
                            <button onClick={handleEditClickSave}>
                              <img src={btnEdit} alt='Edit'/>
                            </button>
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
                      <button onClick={handleEditClickSave}>
                        <img src={btnEdit} alt='Edit'/>
                      </button>
                    </div>
                    {/* <SeachForDocumentation /> */}
                </div>
            )}
            
          </>):
        (
            <form className="form-container edit-form" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className='form-container-brim'>
                <div className='block-surname'>
                    <label htmlFor="last-name">Фамилия</label>
                    <input {...register("surname")} type="text" id="last-name" defaultValue={userData.surname || ''} required />
                </div>
                <div className='block-username'>
                    <label htmlFor="first-name">Имя</label>
                    <input {...register("name")} type="text" id="first-name" defaultValue={userData.name || ''} required />
                </div>
                <div className='block-email'>
                    <label htmlFor="email">Почта</label>
                    <input {...register("email")} type="email" id="email" name="email" defaultValue={userData.email || ''} required />
                </div>
                <button className='submit-form' type="submit">Сохранить</button>
            </div>
          </form>
        )}
      </div>
      {!isEditing ?
      (<div className='user-edit'>
        
        <h3>Пароль</h3>
        {/* <p>Последние изменения 13 янв. 2024 г.</p> */}
        
        <div className='container-edit-btn'>
            <button className='edit-password button' onClick={handleEditClick}>
            <p>Изменить</p>
            </button>
        </div>
      </div>)
      :(
        <form className="form-container edit-form" action="#" method="POST" onSubmit={handleSubmit(handleSubmitForm)}>
            <div className='container-edit-info'>
              <h3>Изменение пароля</h3>
            </div>
            <div className='block-current-password password'>
                <label htmlFor="old_password">Текущий пароль</label>
                <input {...register("old_password")} className='js-input-current-password' value={old_password} onChange={(e) => setCurrentPassword(e.target.value)} type={inputCurrentType} id="current-password" name="old_password" required />
                <img onClick={onClickCurrentEye} className='btn__pass js-btn-password' src={currentCurrentImage} alt='' file='none'/>
            </div>
            <div className='block-password password'>
                <label htmlFor="password">Новый пароль</label>
                <input {...register("password")} className='js-input-password' value={password} onChange={(e) => setPassword(e.target.value)} type={inputType}  id="password" name="password" required />
                <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' file='none'/>
            </div>
            <div className='block-confirm-password password'>
                <label htmlFor="confirmation_password}">Повторите новый пароль</label>
                <input {...register("confirmation_password")} className='js-input-confirm-password' value={confirmation_password} onChange={(e) => setConfirmPassword(e.target.value)} type={inputConfirmType} id="confirm-password" name='confirmation_password' required />
                <img onClick={onClickConfirmEye} className='btn__pass js-btn-password' src={currentConfirmImage} alt='' fill='none'/>
            </div>
            <div className='container-button'>
                <button type="submit" className="btn-add">Отправить</button>
                <button type="button" className="button" onClick={handleCancel}>Отменить</button>
            </div>
          </form>
      )}
    </section>
  );
};

export default InformationUser;
import {useForm} from 'react-hook-form';
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import '../../authorization/formLogIn/formLogIn.css'
import btnPass from '../../../img/icons/password/Visibility=True.svg'
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg'

function FormSignUp(){

    const apiUrl = process.env.REACT_APP_API_URL;

    const [currentImage, setCurrentImage] = useState(btnPass);
    const [inputType, setInputType] = useState('password');

    const [currentConfirmImage, setCurrentConfirmImage] = useState(btnPass);
    const [inputConfirmType, setInputConfirmType] = useState('password');


    const{
        register,
        reset,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();


    const onClickEye = () =>{
        setCurrentImage(currentImage === btnPass ? (btnPassVisib): (btnPass));
        setInputType(inputType === 'text' ? 'password' : 'text');
    }
    const onClickConfirmEye = () =>{
        setCurrentConfirmImage(currentConfirmImage === btnPass ? (btnPassVisib): (btnPass));
        setInputConfirmType(inputConfirmType === 'text' ? 'password' : 'text');
    }


    const onSubmit = async (data) => {
        fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then(response => {
            if (response.ok) {
                alert('Ваша заявка отправлена на верификацию');
                reset();
            }
            else{
                alert('Ошибка при регистрации');
            }
            
          })
        .catch (error => {
          console.error('Ошибка при регистрации:', error);
        })
    }

    return (
            <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <h2>Регистрация</h2>
                <div className='form-container-brim'>
                    <div className='block-surname'>
                        <label for="last-name">Фамилия</label>
                        <input {...register("surname")} type="text" id="last-name" required />
                    </div>
                    <div className='block-username'>
                        <label for="first-name">Имя</label>
                        <input {...register("name")} type="text" id="first-name" required />
                    </div>
                    <div className='block-company'>
                        <label for="name-company">Компания</label>
                        <input {...register("name-company")} type="text" id="name-company" required />
                    </div>
                    <div className='block-email'>
                        <label for="email">Почта</label>
                        <input {...register("email")} type="email" id="email" name="email" required />
                    </div>
                    <div className='block-password'>
                        <label for="password">Пароль</label>
                        <input {...register("password")} className='js-input-password' type={inputType}  id="password" name="password" required />
                        <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' file='none'/>
                    </div>
                    <div className='block-confirm-password'>
                        <label for="confirm-password">Повторите пароль</label>
                        <input {...register("confirmation_password")} className='js-input-confirm-password' type={inputConfirmType} id="confirm-password" required />
                        <img onClick={onClickConfirmEye} className='btn__pass js-btn-password' src={currentConfirmImage} alt='' fill='none'/>
                    </div>
                    <button className='submit-form' type="submit">Зарегистрироваться</button>
                </div>
                <div className='block-registr'>
                    <p>Уже есть аккаунт?</p>
                    <Link to="/logIn" className="btn-registr"> <p>Войдите</p> </Link>
                </div>
            </form>
    );
}

export default FormSignUp;
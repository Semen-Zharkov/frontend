import {useForm} from 'react-hook-form';
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import btnPass from '../../../img/icons/password/Visibility=True.svg'
import btnPassVisib from '../../../img/icons/password/Visibility=False.svg'

function FormResetPassword(){

    const navigate = useNavigate();
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    const [password, setPassword] = useState('');
    const [currentImage, setCurrentImage] = useState(btnPass);
    const [inputType, setInputType] = useState('password');

    const [confirmation_password, setConfirmPassword] = useState('');
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
        fetch(`${apiUrl}/auth/reset-password/${token}?password=${data['password']}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'password': data['password']


        }),
        credentials: 'include'
        }).then(response => {
            if(response.ok){
                alert('Пароль успешно изменён')
                navigate('/logIn');
                reset()
            }
            
          })
        .catch (error => {
          console.error('Ошибка при изменение пароля:', error);
        })
    }

    return (
        <section class="container-reset-password">
            <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <h2>Изменение пароля</h2>
                <div className='block-password password'>
                    <label for="password">Новый пароль</label>
                    <input {...register("password")} className='js-input-password' value={password} onChange={(e) => setPassword(e.target.value)} type={inputType}  id="password" name="password" required />
                    <img onClick={onClickEye} className='btn__pass js-btn-password' src={currentImage} alt='' file='none'/>
                </div>
                <div className='block-confirm-password password'>
                    <label for="confirmation_password}">Повторите новый пароль</label>
                    <input {...register("confirmation_password")} className='js-input-confirm-password'  value={confirmation_password} onChange={(e) => setConfirmPassword(e.target.value)} type={inputConfirmType} id="confirm-password" required />
                    <img onClick={onClickConfirmEye} className='btn__pass js-btn-password' src={currentConfirmImage} alt='' fill='none'/>
                </div>

                <button className='submit-form' type="submit">Изменить пароль</button>
            </form>
        </section>
    );
}

export default FormResetPassword;
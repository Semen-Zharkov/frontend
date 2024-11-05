import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import '../../components/personArea/mainPersonArea/informationUser.css';
import { AcceptRequest } from './acceptRequest';
import { RejectRequest } from './rejectRequest';
import { Popup } from '../popup';
import { useLazyGetListUserVerificationQuery } from '../../components/store/services/admin';

const UserVerification = ({ onClick }) => {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [flag, setFlag] = useState(false);
    const [flagReject, setFlagReject] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [disabledButton, setDisabledButton] = useState(false); // Начальное состояние - кнопки не заблокированы
    const{
        handleSubmit,
    } = useForm();
    const [trigger, {data: dataListUserVerification, status}] = useLazyGetListUserVerificationQuery()

    const toggleDropdown = async () => {
        if (!isOpen) {
            await trigger()
        }
        setIsOpen(!isOpen);
    };

    const acceptRequest = (id) => {
        setDisabledButton(true)
        AcceptRequest({ id, setFlag, setMessage });
    }

    const rejectRequest = (id) => {
        setDisabledButton(true)
        RejectRequest({id, setFlag, setMessage});
    }

    const handleClose = () => {
        setFlag(false);
        window.location.reload();
    };
    useEffect(()=>{
        if(status==='fulfilled'){
            setData(dataListUserVerification)
        }
    },[status])
    return (
        <div className="dropdown-container">
            <div className="dropdown">
                {flag && <Popup disabled={disabledButton} isOpen={flag} message={message} onClose={()=>handleClose()} setDisabledButton={setDisabledButton} />}
                {/* {flagReject && <Popup disabled={disabledButton} isOpen={flagReject} message={message} onClose={()=>handleClose()} setDisabledButton={setDisabledButton} />} */}
                <button className='user-verification' onClick={toggleDropdown}>Пользователи на верификацию</button>
                {isOpen && data.length > 0 && (
                    <ul className='verf-list'>
                        {data.map((item, index) => (
                            <li className='verf-list-item' key={index}>
                                <div className='verf-item-inform'>
                                    <div className='inform-user'>
                                        <p>{item['info'].name}</p>
                                        <p>{item['info'].surname}</p>
                                    </div>
                                    <div className='verf-item-email'>
                                        <p>{item['info'].email}</p>
                                    </div>
                                </div>
                                <div className='verf-item-block-btn container-button'>
                                    <button disabled={disabledButton} className='button' onClick={() => acceptRequest(item['id'])}>Принять</button>
                                    <button disabled={disabledButton} className='button' onClick={() => rejectRequest(item['id'])}>Отклонить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                {isOpen && data.length === 0 && (
                    <div>Нет пользователей на верификацию</div>
                )}
            </div>
        </div>
    );
}

export default UserVerification;
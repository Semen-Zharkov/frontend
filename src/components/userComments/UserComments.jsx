import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './userComments.css';
import likeIcon from '../../img/like.svg';
import dislikeIcon from '../../img/dislike.svg';
import closeForm from '../../img/close.svg'

export const UserComments=(props)=>{
    const [feedbackText, setfeedbackText] = useState('');
    const [data, setData] = useState([]);
    const [feedback,setfeedback] = useState('');
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [statusRequest, setStatusRequest] = useState('');
    const [nameDoc, setNameDoc] = useState('')

    const requestData = {
        value: feedback,
        llm_response: JSON.stringify(props.result),
        user_comment: feedbackText,
        request_id: props.request_id

    }
    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const  handlOnClickLike = () => {
        setfeedback('like')
        setLikeClicked(!likeClicked);
        setShowForm(true);
    }

    const handlOnClickDislike = () => {
        setfeedback('dislike')
        setDislikeClicked(!dislikeClicked);
        setShowForm(true);
    }

    const handlOnClickClose = () => {
        setDislikeClicked(false);
        setLikeClicked(false);
        setShowForm(false);
        handleCancel();
    }

    const handleCancel = () => {
        reset({
            feedbackText: '',
        });
        setfeedbackText(null);
        setStatusRequest('');
    };

    const fetchData = async () => {
        try {
            // Отправка запроса на выход пользователя
            const response = await fetch(`${apiUrl}/send_feedback`, {
                method: 'POST', // установите метод POST
                credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json', // Установите заголовок Content-Type
                },
            });
            // setIsLoggedIn(false);
            // Проверка успешности выполнения запроса на выход
            if (response.ok) {
                setData(await response.json());
                handlOnClickClose();
                // Выполните здесь необходимые действия после выхода пользователя (например, перенаправление на страницу входа)
            } else {
                console.error('feedback request failed');
            }
        } catch (error) {
            console.error('feedback error:', error);
        }
    }

    return (
        <form className="feedback-container" action="#" method="POST">
            <div className='form-grade'>
                <img alt="like"
                    src={likeIcon}
                    onClick={handlOnClickLike}
                    style={{ filter: likeClicked ? 'none' : 'invert(70%)' }}
                />
                <img alt="dislike"
                    src={dislikeIcon}
                    onClick={handlOnClickDislike}
                    style={{ filter: dislikeClicked ? 'none' : 'invert(70%)' }}
                />
            </div>
            {showForm && (
                
                <div className='form-feedback'>
                    <div className='form-feedback-block'>
                        <div className='form-feedback-block-title'>
                            <div className="feedbackText">Обратная связь </div>
                            <img alt='close-icon'
                                src={closeForm}
                                onClick={handlOnClickClose}
                            />
                        </div>
                        <textarea
                            {...register("feedbackText")}
                            type="text"
                            value={feedbackText}
                            onChange={(e) => setfeedbackText(e.target.value)}
                            id="feedbackText"
                            name="feedbackText"
                            required
                        />
                    </div>
                    <div className='container-button'>
                        <button type='button' className="btn-add" onClick={fetchData}>Отправить</button>
                        <button type='button' className="button" onClick={handleCancel}>Отменить</button>
                    </div>
                </div>
            )}
            
        </form>
    );
}

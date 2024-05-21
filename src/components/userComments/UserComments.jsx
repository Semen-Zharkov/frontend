import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './userComments.css';
import likeIcon from '../../img/like.svg';
import dislikeIcon from '../../img/dislike.svg';
import closeForm from '../../img/close.svg';

export const UserComments = (props) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [data, setData] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [statusRequest, setStatusRequest] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const requestData = {
        value: feedback,
        llm_response: JSON.stringify(props.result),
        user_comment: feedbackText,
        request_id: props.request_id
    };

    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, reset, handleSubmit } = useForm();

    const handleOnClickLike = () => {
        setFeedback('like');
        setLikeClicked(!likeClicked);
        setShowForm(true);
    };

    const handleOnClickDislike = () => {
        setFeedback('dislike');
        setDislikeClicked(!dislikeClicked);
        setShowForm(true);
    };

    const handleOnClickClose = () => {
        setDislikeClicked(false);
        setLikeClicked(false);
        setShowForm(false);
        handleCancel();
    };

    const handleCancel = () => {
        reset({
            feedbackText: '',
        });
        setFeedbackText('');
        setStatusRequest('');
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/send_feedback`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(requestData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setData(await response.json());
                handleOnClickClose();
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000); // Hide the popup after 3 seconds
            } else {
                console.error('Feedback request failed');
            }
        } catch (error) {
            console.error('Feedback error:', error);
        }
    };

    return (
        <form className="feedback-container" action="#" method="POST">
            <div className='form-grade'>
                <img alt="like"
                    src={likeIcon}
                    onClick={handleOnClickLike}
                    style={{ filter: likeClicked ? 'none' : 'invert(70%)' }}
                />
                <img alt="dislike"
                    src={dislikeIcon}
                    onClick={handleOnClickDislike}
                    style={{ filter: dislikeClicked ? 'none' : 'invert(70%)' }}
                />
            </div>
            {showForm && (
                <div className='form-feedback'>
                    <div className='form-feedback-block'>
                        <div className='form-feedback-block-title'>
                            <div className="feedbackText">Обратная связь</div>
                            <img alt='close-icon'
                                src={closeForm}
                                onClick={handleOnClickClose}
                            />
                        </div>
                        <textarea
                            {...register("feedbackText")}
                            type="text"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
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
            {showPopup && (
                <div className="popup-user-comment">
                    Спасибо за вашу оценку
                </div>
            )}
        </form>
    );
};
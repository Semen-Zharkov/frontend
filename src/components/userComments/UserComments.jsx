import { useForm } from 'react-hook-form';
import React, { useState, useRef } from 'react';
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

    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const requestData = {
        value: feedback,
        llm_response: JSON.stringify(props.result),
        user_comment: feedbackText,
        request_id: props.request_id
    };

    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, reset } = useForm();

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

    const handleMouseDown = (e) => {
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
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
                <div
                    className='form-feedback'
                    style={{ top: `${position.y}px`, left: `${position.x}px`, position: 'absolute' }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
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
                        <button type='button' className="button" onClick={handleCancel}>Отчистить</button>
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

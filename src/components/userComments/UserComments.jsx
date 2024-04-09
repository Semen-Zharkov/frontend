import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './userComments.css';
import likeIcon from '../../img/likeIcon.svg';
import dislikeIcon from '../../img/dislikeIcon.svg';

const UserComments=(props)=>{
    const [fitbackText, setFitbackText] = useState('');
    const [data, setData] = useState([]);
    const [fitback,setFitback] = useState('');
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    const [nameDoc, setNameDoc] = useState('')

    const requestData = {
        value: fitback,
        llm_response: JSON.stringify(props.result),
        user_comment: fitbackText,
        request_id: props.id

    }
    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const  handlOnClickLike = () => {
        setFitback('like')
        setLikeClicked(!likeClicked);
    }

    const handlOnClickDislike = () => {
        setFitback('dislike')
        setDislikeClicked(!dislikeClicked);
    }
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
                // Выполните здесь необходимые действия после выхода пользователя (например, перенаправление на страницу входа)
            } else {
                console.error('Fitback request failed');
            }
        } catch (error) {
            console.error('Fitback error:', error);
        }
    }

    return (
        <form className="fitback-container" onSubmit={handleSubmit(fetchData)}>
        <div>
            <img alt="like"
                src={likeIcon}
                onClick={handlOnClickLike}
                style={{ filter: likeClicked ? 'invert(100%)' : 'none' }}
            />
            <img alt="dislike"
                src={dislikeIcon}
                onClick={handlOnClickDislike}
                style={{ filter: dislikeClicked ? 'invert(100%)' : 'none' }}
            />
        </div>

        <label htmlFor="fitbackText">Обратная связь:</label>
        <input
            {...register("fitbackText")}
            type="text"
            value={fitbackText}
            onChange={(e) => setFitbackText(e.target.value)}
            id="fitbackText"
            name="fitbackText"
            required
        />
        <button type="button" onClick={fetchData}>Отправить фитбек</button>
    </form>
    );
}
export default UserComments;
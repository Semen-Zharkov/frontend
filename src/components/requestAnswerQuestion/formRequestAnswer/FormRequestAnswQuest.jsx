import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import './formRequestAnswQuest.css';
import icomSubmitQuest from '../../../img/icons/Icon-color.svg';
import { UserComments } from '../../userComments/UserComments';

const RequestsAnswer = (props) => {
    const formRef = useRef(null);
    const [massivAnswer, setMassivAnswer] = useState([]);
    const [id, setId] = useState('');
    const [result, setResult] = useState('');
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [answerServer, setAswerServer] = useState('');
    const textareaRef = useRef(null);

    const handleIconClick = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const addItem = (newItem) => {
        setMassivAnswer((prevItems) => [...prevItems, newItem]);
    };

    const handleCancel = () => {
        reset({
            question: '',
        });
        setQuestion(''); 
    };
    
    const onSubmitTest = async () => {
        try {
            const response = await fetch(`${apiUrl}/get_answer?filename=${props.param}&question=${question}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            handleCancel(); 
            addItem(responseData['result']); // Получение данных из ответа
            setAswerServer(responseData);
            setId(responseData['request_id']);
            setResult(responseData['result']);
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
        }
    };
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '22px'; // Сброс высоты для вычисления
            let newHeight = textareaRef.current.scrollHeight - 20;

            if (newHeight > 250) {
                textareaRef.current.style.height = '250px';
                textareaRef.current.style.overflowY = 'auto'; // Добавляем вертикальный скролл
            } else {
                textareaRef.current.style.height = `${newHeight}px`;
                textareaRef.current.style.overflowY = 'hidden'; // Убираем вертикальный скролл
            }
        }
    }, [question]);

    return (
        <div>
            <form className='form-container-question block-form-request' ref={formRef} action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <div>Ответы на основе документации {props.param}</div>
                <div className="answers-list">
                    {massivAnswer.map((item, index) => (
                        <div key={index} className="answer">
                            <div className="questions-container">
                                <p>{item.question}</p>
                            </div>
                            <div className="answer-container">
                                <p>{item.answer}</p>
                                <UserComments request_id={id} result={result} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='block-input'>
                    <textarea
                        {...register("question")}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        ref={textareaRef}
                        id="question"
                        placeholder='Ваш вопрос'
                        name="question"
                        required
                    />
                    <button type='submit'>
                        <img src={icomSubmitQuest} className='iconSubmitQuest' alt='' />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestsAnswer;
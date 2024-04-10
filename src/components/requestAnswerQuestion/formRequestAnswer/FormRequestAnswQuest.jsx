import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formRequestAnswQuest.css';

const RequestsAnswer = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('documentation');
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [answerServer, setAswerServer] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const onSubmitTest = async () => {
            try {
                const response = await fetch(`${apiUrl}/get_answer?filename=${param}&question=${question}`, {
                    method: 'POST',
                    credentials: 'include',                   
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json(); // Получение данных из ответа
                setAswerServer(responseData)
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }

    };


    return (
        <>
            <form class='form-container' action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <div htmlFor="filename">Ответ создаётся на основе документации {param}</div>
                <label htmlFor="question">Ваш вопрос:</label>
                <input
                    {...register("question")} type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" name="question" required
                />
                <button type="submit">Отправить</button>
            </form>
            {answerServer && (
                <div className="answer">
                    <div className="questions-container">
                        <p>Ваш вопрос:</p>
                        <p>{answerServer.question}</p>
                    </div>
                    <div className="answer-container">
                        <p>Ответ:</p>
                        <p>{answerServer.answer}</p>
                    </div>
                </div>
            )}
            
        </>
    );
};
export default RequestsAnswer;
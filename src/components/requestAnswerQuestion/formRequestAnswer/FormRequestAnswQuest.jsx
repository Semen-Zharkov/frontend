import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './formRequestAnswQuest.css';

const FormTest = () => {
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
                const response = await fetch(`${apiUrl}/get_answer?filename=${filename}&question=${question}`, {
                    method: 'POST',
                    credentials: 'include',                   
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json(); // Получение данных из ответа
                setAswerServer(responseData.result_from_gigachatAPI);
                console.log(answerServer)
                console.log('Ответ от сервера:', responseData.result_from_gigachatAPI);
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }

    };


    return (
        <>
            <form class='form-container' action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <label htmlFor="filename">Название файла:</label>
                <input
                    {...register("filename")} type="text" value={filename} onChange={(e) => {setFilename(e.target.value)}} id="filename" name="filename" required />
                <label htmlFor="question">Ваш вопрос:</label>
                <input
                    {...register("question")} type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" name="question" required
                />
                <button type="submit">Отправить</button>
            </form>
            {answerServer && (
                <div className="answer">
                    <p>Ответ от сервера: {answerServer}</p>
                </div>
            )}
            
        </>
    );
};
export default FormTest;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './requestTest.css'

const FormTest = () => {
    const [filename, setFilename] = useState('');
    const [queNum, setQueNum] = useState('');
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answerServer, setAswerServer] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, handleSubmit } = useForm();

    const onSubmitTest = async () => {
        try {
            const response = await fetch(`${apiUrl}/get_test?filename=${filename}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Возникла ошибка при обработке запроса: ${response}`);
            }

            const responseData = await response.json();
            setQuestionData(responseData['result']);
            console.log(questionData)
            setSelectedAnswer('');
            setIsAnswerCorrect(null);
        } catch (error) {
            setAswerServer(`Ошибка при отправке запроса: ${error}`);
        }
    };

    const handleAnswerSelection = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswerCorrect(answer === questionData['right answer']);
    };

    return (
        <>
            <form className='form-container' onSubmit={handleSubmit(onSubmitTest)}>
                <label htmlFor="filename">Название файла:</label>
                <input {...register("filename")} type="text" value={filename} onChange={(e) => setFilename(e.target.value)} id="filename" name="filename" required />

                <button type="submit">Отправить</button>
            </form>

            {questionData && (
                <div className='question-container'>
                    <h3>Вопрос:</h3>
                    <p>{questionData.question}</p>

                    <h3>Варианты ответов:</h3>
                    <ul>
                        {['1 option', '2 option', '3 option', '4 option'].map((optionKey, index) => (
                            <li key={index} onClick={() => handleAnswerSelection(questionData[optionKey])} style={{ cursor: 'pointer', backgroundColor: selectedAnswer === questionData[optionKey] ? (isAnswerCorrect ? 'green' : 'red') : 'transparent' }}>
                                {questionData[optionKey]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {answerServer && (<div className='answer'>{answerServer}</div>)}
        </>
    );
};

export default FormTest;
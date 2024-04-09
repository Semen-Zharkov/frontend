import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './requestTest.css';
import DataProvider from '../../userComments/UserComments';

const FormTest = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get('documentation');
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [id, setId] = useState('');
    const [result, setResult] = useState('')
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answerServer, setAswerServer] = useState('');

    

    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, handleSubmit } = useForm();

    const onSubmitTest = async () => {
        try {
            const response = await fetch(`${apiUrl}/get_test?filename=${param}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Возникла ошибка при обработке запроса: ${response}`);
            }

            const responseData = await response.json();
            setQuestionData(responseData['result']);
            setId(responseData['request_id'])
            setResult(responseData['result'])
            setSelectedAnswer('');
            setIsAnswerCorrect(null);
        } catch (error) {
            setAswerServer(`Ошибка при отправке запроса: ${error}`);
        }
    };

    const handleAnswerSelection = (answer) => {
        // Проверяем, правильный ли ответ
        const isCorrect = answer === questionData['right answer'];
        
        // Обновляем состояние isAnswerCorrect
        setIsAnswerCorrect(isCorrect);
    
        setSelectedAnswer(answer);
        
        // Если ответ неправильный, подсвечиваем правильный ответ зеленым
        if (!isCorrect) {
            const correctOption = Object.values(questionData).find(val => val === questionData['right answer']);
            const options = document.querySelectorAll('.option');
            options.forEach(option => {
                if (option.textContent === correctOption) {
                    option.style.backgroundColor = 'green';
                }
            });
        }
    };
    return (
        <>
            <form className='form-container' onSubmit={handleSubmit(onSubmitTest)} >
                <div htmlFor="filename">Тест получается на основе документации {param}</div>

                <button type="submit">Отправить</button>
            </form>

            {questionData && (
                <div className='question-container'>
                    <h3>Вопрос:</h3>
                    <p>{questionData.question}</p>

                    <h3>Варианты ответов:</h3>
                    <ul>
                        {['1 option', '2 option', '3 option', '4 option'].map((optionKey, index) => (
                            <li key={index} onClick={() => handleAnswerSelection(questionData[optionKey])} style={{ cursor: 'pointer', backgroundColor: selectedAnswer === questionData[optionKey] ? (isAnswerCorrect ? 'green' : 'red') : 'transparent' }} className="option">
                                {questionData[optionKey]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <DataProvider asd id={id} result={result}/>
        </>
    );
};

export default FormTest;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../workDocumentation/workDocumentation/workDocumentation.css';
import { UserComments } from '../userComments/UserComments';

const Spinner = () => (
    <div className="spinner-container">
        <div className="spinner"></div>
    </div>
);

const RequestsTest = (props) => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [id, setId] = useState('');
    const [result, setResult] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [answerServer, setAnswerServer] = useState('');
    const [loading, setLoading] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;
    const { handleSubmit } = useForm();

    const onSubmitTest = async () => {
        setLoading(true); // Показываем spinner
        try {
            const response = await fetch(`${apiUrl}/get_test?filename=${props.param}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Возникла ошибка при обработке запроса: ${response}`);
            }

            const responseData = await response.json();
            setQuestionData(responseData['result']);
            setId(responseData['request_id']);
            setResult(responseData['result']);
            setSelectedAnswer('');
            setIsAnswerCorrect(null);
        } catch (error) {
            setAnswerServer(`Ошибка при отправке запроса: ${error}`);
        } finally {
            setLoading(false); // Скрываем spinner
        }
    };

    const handleAnswerSelection = (answer) => {
        const isCorrect = answer === questionData['right answer'];
        setIsAnswerCorrect(isCorrect);
        setSelectedAnswer(answer);
    };

    return (
        <section className='container-work-documentation'>
            <form className='form-container-test block-form-request' onSubmit={handleSubmit(onSubmitTest)}>
                <div>Тесты на основе документации {props.param}</div>
                <button className='btn-add button-test' type="submit" disabled={loading}>
                    Сгенерировать тест
                </button>
                {loading && <Spinner />}
                {questionData && (
                    <div className='question-container'>
                        <p>{questionData.question}</p>
                        <ul className='test-list'>
                            {['1 option', '2 option', '3 option', '4 option'].map((optionKey, index) => (
                                <li
                                    key={index}
                                    className={`test-list-item ${selectedAnswer ? (questionData[optionKey] === questionData['right answer'] ? 'answer-right' : (selectedAnswer === questionData[optionKey] ? 'answer-wrong' : '')) : ''}`}
                                    onClick={() => handleAnswerSelection(questionData[optionKey])}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {questionData[optionKey]}
                                </li>
                            ))}
                        </ul>
                        <UserComments request_id={id} result={result} />
                    </div>
                )}
            </form>
            {answerServer && <div>{answerServer}</div>}
        </section>
    );
};

export default RequestsTest;
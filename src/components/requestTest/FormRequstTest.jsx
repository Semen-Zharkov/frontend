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
    const [serverError, setServerError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const { handleSubmit } = useForm();

    const onSubmitTest = async () => {
        setServerError('');
        setLoading(true); // Показываем spinner
        try {
            const response = await fetch(`${apiUrl}/get_test?filename=${props.param}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Произошла ошибка при генерации теста, попробуйте сгенерировать заново');
            }

            const responseData = await response.json();
            setQuestionData(responseData['result']);
            setId(responseData['request_id']);
            setResult(responseData['result']);
            setSelectedAnswer('');
            setIsAnswerCorrect(null);
            setAnswerServer(''); // Сбрасываем предыдущий правильный ответ
        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false); // Скрываем spinner
        }
    };

    const handleAnswerSelection = async (answer) => {
        if (answerServer) {
            setSelectedAnswer(answer);
            setIsAnswerCorrect(answer === answerServer);
        } else {
            setSelectedAnswer(answer);
            setLoading(true);
            setServerError('');

            try {
                const response = await fetch(`${apiUrl}/check_test`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        request_id: id,
                        selected_option: answer,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Произошла ошибка при проверке ответа');
                }

                const responseData = await response.json();
                setIsAnswerCorrect(responseData['right answer'] === answer);
                setAnswerServer(responseData['right answer']);
            } catch (error) {
                setServerError(error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <section className='container-work-documentation'>
            <form className='form-container-test block-form-request' onSubmit={handleSubmit(onSubmitTest)}>
                <div>Тесты на основе документации {props.param}</div>
                {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
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
                                    className={`test-list-item ${
                                        selectedAnswer
                                            ? questionData[optionKey] === answerServer
                                                ? 'answer-right'
                                                : selectedAnswer === questionData[optionKey]
                                                ? 'answer-wrong'
                                                : ''
                                            : ''
                                    }`}
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
            {answerServer && <div>Правильный ответ: {answerServer}</div>}
        </section>
    );
};

export default RequestsTest;
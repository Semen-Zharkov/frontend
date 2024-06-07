import { useForm } from 'react-hook-form';
import React, { useState, useRef, useEffect } from 'react';
import './formRequestAnswQuest.css';
import icomSubmitQuest from '../../../img/icons/Icon-color.svg';
import { UserComments } from '../../userComments/UserComments';

const Spinner = () => (
    <div className="spinner-container">
        <div className="spinner"></div>
    </div>
);

const RequestsAnswer = (props) => {
    const formRef = useRef(null);
    const answersListRef = useRef(null); // Reference for the answers list
    const [massivAnswer, setMassivAnswer] = useState([]);
    const [id, setId] = useState('');
    const [result, setResult] = useState('');
    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [answerServer, setAswerServer] = useState('');
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const { register, reset, handleSubmit } = useForm();

    const addItem = (newItem) => {
        setMassivAnswer((prevItems) => [...prevItems, newItem]);
    };

    const handleCancel = () => {
        reset({
            question: '',
        });
        setQuestion(''); 
    };

    const formatAnswer = (answer) => {
        if (answer.includes('\n\n')) {
            const steps = answer.split('\n').map((step, index) => {
                return <p key={index}>{step}</p>;
            });
            return <div className="formatted-answer">{steps}</div>;
        }
        return <p>{answer}</p>;
    };

    const onSubmitTest = async () => {
        setLoading(true); // Показываем спиннер
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
        } finally {
            setLoading(false); // Скрываем спиннер
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '22px'; // Сброс высоты для вычисления
            let newHeight = textareaRef.current.scrollHeight - 20;

            if (newHeight > 450) {
                textareaRef.current.style.height = '450px';
                textareaRef.current.style.overflowY = 'auto'; // Добавляем вертикальный скролл
            } else {
                textareaRef.current.style.height = `${newHeight}px`;
                textareaRef.current.style.overflowY = 'hidden'; // Убираем вертикальный скролл
            }
        }
    }, [question]);

    useEffect(() => {
        if (answersListRef.current) {
            answersListRef.current.scrollTop = answersListRef.current.scrollHeight;
        }
    }, [massivAnswer]); // Scroll to bottom whenever massivAnswer changes

    return (
        <section className='container-work-documentation'>
            <form className='form-container-question block-form-request' ref={formRef} action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <div>Ответы на основе документации {props.param}</div>
                <div className="answers-list" ref={answersListRef}>
                    {massivAnswer.map((item, index) => (
                        <>
                            <div className="questions-container">
                                <p>{item.question}</p>
                            </div>
                            <div className="answer-container">
                                {formatAnswer(item.answer)}
                                <UserComments request_id={id} result={result} />
                            </div>
                        </>
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
                    <button type='submit' disabled={loading} style={{ display: loading ? 'none' : 'block' }}>
                        <img src={icomSubmitQuest} className='iconSubmitQuest' alt='' />
                    </button>
                    {loading && <Spinner />}
                </div>
            </form>
        </section>
    );
};

export default RequestsAnswer;
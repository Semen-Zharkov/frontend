import { useForm } from 'react-hook-form';
import React, { useState,useRef } from 'react';
import './formRequestAnswQuest.css';
import icomSubmitQuest from '../../../img/icons/Icon-color.svg'

const RequestsAnswer = (props) => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const param = searchParams.get('documentation');
    const formRef = useRef(null);
    const [massivAnswer, setMassivAnswer] = useState([])

    const [filename, setFilename] = useState('');
    const [question, setQuestion] = useState('');
    const [answerServer, setAswerServer] = useState('');
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
                addItem(responseData) // Получение данных из ответа
                setAswerServer(responseData)
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }

    };


    return (
        <div>
            <form class='form-container-question block-form-request' ref={formRef} action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <div htmlFor="filename">Ответы на основе документации {props.param}</div>
                <div className="answers-list">
                    {massivAnswer.map((item, index) => (
                        <div key={index} className="answer">
                            <div className="questions-container">                               
                                <p>{item.question}</p>
                            </div>
                            <div className="answer-container">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='block-input'>
                    <input
                        {...register("question")} type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder='Ваш вопрос' name="question" required
                    />
                    <button type="submit">
                        <img src={icomSubmitQuest} className='iconSubmitQuest' alt='' />
                    </button>
                </div>
            </form>
            {/* {answerServer && (
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
            )} */}
            
        </div>
    );
};
export default RequestsAnswer;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './requestDocumentation.css';
import DataProvider from '../../userComments/UserComments';
import RequestsTest from '../../requestTest/FormRequstTest';
import RequestsAnswer from '../../requestAnswerQuestion/formRequestAnswer/FormRequestAnswQuest';

const FormTest = () => {
    const [flagTestOrAnswer, setFlagTestOrAnswer] = useState(false);
    const [id, setId] = useState('');
    const [result, setResult] = useState('')
    const { register, handleSubmit } = useForm();

    const onClickTest = () =>{
        setFlagTestOrAnswer(false)
    }
    const onClickAnswer = () =>{
        setFlagTestOrAnswer(true)
    }

    return (
        <>
            <div className='btn-container'>
                <button className="btn-request-test button" onClick={onClickTest}> Создать тест </button>
                <button className="btn-request-answer button" onClick={onClickAnswer}> Задать вопрос </button>
            </div>
            
            {!flagTestOrAnswer && <RequestsTest />}
            {flagTestOrAnswer && <RequestsAnswer />}
            <DataProvider id={id} result={result}/>
        </>
    );
};

export default FormTest;
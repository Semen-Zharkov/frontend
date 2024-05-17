import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import RequestsTest from '../requestTest/FormRequstTest';
import RequestsAnswer from '../requestAnswerQuestion/formRequestAnswer/FormRequestAnswQuest';
import Header from '../main/header/Header';
import { FlagContext } from '../../flagContext';

const RequestDocumentation = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const { flagBtn } = useContext(FlagContext);
    const { register, handleSubmit } = useForm();
    const param = searchParams.get('documentation');
    return (
        <>
            {/* <div className='btn-container'>
                <button className="btn-request-test button" onClick={onClickTest}> Создать тест </button>
                <button className="btn-request-answer button" onClick={onClickAnswer}> Задать вопрос </button>
            </div> */}
            <Header />
            {!flagBtn ? <RequestsTest param={param}/> : <RequestsAnswer param={param}/>}
            {/* <DataProvider id={id} result={result}/> */}
        </>
    );
}
export default RequestDocumentation;
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
            <Header />
            {!flagBtn ? <RequestsTest param={param}/> : <RequestsAnswer param={param}/>}
        </>
    );
}
export default RequestDocumentation;
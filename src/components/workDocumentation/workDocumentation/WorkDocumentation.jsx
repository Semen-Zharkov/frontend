import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './workDocumentation.css';
import DataProvider from '../../userComments/UserComments';
import RequestsTest from '../../requestTest/FormRequstTest';
import RequestsAnswer from '../../requestAnswerQuestion/formRequestAnswer/FormRequestAnswQuest';
import SeachForDocumentation from '../../seachForDocumentation/SeachForDocumentation';
import iconAdd from '../../../img/icons/Add.svg'

const WorkDocumentation = () => {
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
        <section className='container-documentation'>
            <h2>Мои документации</h2>
            <div className='block-all-documentation'>
                <div className='container-documentation-btn'>
                    <button className='btn-download btn-add'>
                        <img src={iconAdd} alt=''/>
                        <p>Загрузить</p>
                    </button>
                    <div className='container-list-btn'>
                        <p>Загруженные</p>
                    </div>
                </div>
                <div className='list-documentation'>
                    <SeachForDocumentation />
                </div>
            </div>
            {/* <div className='btn-container'>
                <button className="btn-request-test button" onClick={onClickTest}> Создать тест </button>
                <button className="btn-request-answer button" onClick={onClickAnswer}> Задать вопрос </button>
            </div> */}
            
            {/* {!flagTestOrAnswer && <RequestsTest />}
            {flagTestOrAnswer && <RequestsAnswer />}
            <DataProvider id={id} result={result}/> */}
        </section>
    );
};

export default WorkDocumentation;
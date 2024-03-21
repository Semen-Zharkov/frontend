import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import '../../authorization/formLogIn/FormLogIn';

const FormTest = () => {
    const [filename, setFilename] = useState('');
    const [queNum, setQueNum] = useState('');
    const [answerServer, setAswerServer] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const onSubmitTest = async (data) => {
            const formData = new FormData();
            formData.append('filename', filename); // Добавление файла в FormData
            formData.append('gue_num', queNum);
            try {
                const response = await fetch(`${apiUrl}/get_test?filename=${filename}&que_num=${queNum}`, {
                    method: 'POST',
                    credentials: 'include',

                    
                });
        
                if (!response.ok) {
                    setAswerServer(`Возникла ошибка при обработке запроса: ${response}`)
                    throw new Error('Network response was not ok');
                }
        
                const responseData = await response.json(); // Получение данных из ответа
                setAswerServer(responseData.result_from_gigachatAPI.result)
            } catch (error) {
                setAswerServer(`Ошибка при отправке запроса:${error}`);
            }

    }

    return (
        <>
            <form class='form-container' action="#" method="POST" onSubmit={handleSubmit(onSubmitTest)}>
                <label htmlFor="filename">Название файла:</label>
                <input
                    {...register("filename")} type="text" value={filename} onChange={(e) => setFilename(e.target.value)} id="filename" name="filename" required />
                <label htmlFor="que_num">Количество вопросов:</label>
                <input
                    {...register("que_num")} type="numder" value={queNum} onChange={(e) => setQueNum(e.target.value)} id="que_num" name="que_num" required
                />
                <button type="submit">Отправить</button>
            </form>
            {answerServer &&(<div className='answer'>{answerServer}</div>)}
        </>
    );
};
export default FormTest;
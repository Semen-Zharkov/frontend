import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import axios from 'axios';

const FormTest = () => {
    const [dockName, setDockName] = useState('');
    const [dockDescription, setDockDescription] = useState('');
    const [files, setFiles] = useState('');
    const [statusRequest, setStatusRequest] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;
    const {
        register,
        reset,
        handleSubmit,
    } = useForm();

    const onSubmitDock = async (e) =>{
            const formDatas = new FormData();
            formDatas.append('file', e.files[0]);
            try{
                const response = await fetch(`${apiUrl}/docks/upload-dock?dock_name=${dockName}&dock_description=${dockDescription}`,{
                    method: 'POST',
                    credentials: 'include',
                    body: formDatas,// Передача FormData в теле запроса
                });
            
                if (!response.ok) {
                    setStatusRequest(`Возникла ошибка при обработке запроса: ${response.status}`)
                    throw new Error('Network response was not ok');
                }
            
                const responseData = await response.json(); // Получение данных из ответа
                setStatusRequest('Файл успешно добавлен в базу данных')
                console.log('Ответ от сервера:', responseData);
                } catch (error) {
                    setStatusRequest(`Ошибка при отправке запроса: ${error}`)
                }
            }
    return (
        <>
            <form class='form-container' action="#" method="POST" onSubmit={handleSubmit(onSubmitDock)}>
                <label htmlFor="dockName">Название файла:</label>
                <input
                    {...register("dockName")} type="text" value={dockName} onChange={(e) => setDockName(e.target.value)} id="dock_name" name="dock_name" required />
                <label htmlFor="dockDescription">Описание файла:</label>
                <input
                    {...register("dockDescription")} type="text" value={dockDescription} accept=".pdf,.doc,.docx,.txt,.zip" onChange={(e) => setDockDescription(e.target.value)} id="dock_description" name="dock_description" required
                />
                <label htmlFor="files">Прикрепить файл</label>
                <input
                    {...register("files")} type="file" value={files} accept=".pdf,.doc,.docx,.txt,.zip" onChange={(e) => setFiles(e.target.value)} id="files" name="files" required
                />
                <button type="submit">Отправить</button>
            </form>
            {statusRequest &&(<div className='answer'>{statusRequest}
                
            </div>)}
        </>
    );
};
export default FormTest;
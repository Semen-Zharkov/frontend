import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import './uploadFile.css';
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
        formState: { isSubmitSuccessful }
    } = useForm();

    const onSubmitDock = async (data) => {
        const formDatas = new FormData();
        formDatas.append('file', data.files[0]);
        console.log(data.files[0])
        try {
            const response = await fetch(`${apiUrl}/docks/upload-dock?dock_name=${dockName}&dock_description=${dockDescription}`, {
                method: 'POST',
                credentials: 'include',
                body: formDatas
            });

            if (!response.ok) {
                setStatusRequest(`Возникла ошибка при обработке запроса: ${response.status}`);
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            alert('Файл успешно добавлен в базу данных');
            handleCancel();
            console.log('Ответ от сервера:', responseData);
        } catch (error) {
            setStatusRequest(`Ошибка при отправке запроса: ${error}`);
        }
    };

    const handleCancel = () => {
        reset({
            dockName: '',
            dockDescription: '',
            files: null
        });
        setStatusRequest('');
    };

    return (
        <>
            <form className='form-container-upload' action="#" method="POST" onSubmit={handleSubmit(onSubmitDock)}>
                <h2>Добавление документации</h2>
                <div className='upload-name'>
                    <label htmlFor="dockName">Название</label>
                    <input
                       {...register("dockName")} type="text" value={dockName} onChange={(e) => setDockName(e.target.value)} id="dock_name" name="dock_name" required />
                </div>
                <div className='upload-description'>
                    <label htmlFor="dockDescription">Описание</label>
                    <textarea
                        {...register("dockDescription")} type="text" value={dockDescription} accept=".pdf,.doc,.docx,.txt,.zip" onChange={(e) => setDockDescription(e.target.value)} id="dock_description" name="dock_description" required
                    />
                </div>
                <div className='upload-file'>
                    <input
                        {...register("files")} type="file" value={files} accept=".txt,.zip" onChange={(e) => setFiles(e.target.value)} id="files" name="files" required
                        />
                </div>
                <div className='container-button'>
                    <button type="submit" className="btn-add">Отправить</button>
                    <button type="button" className="button" onClick={handleCancel}>Отменить</button>
                </div>
            </form>
            {statusRequest && (<div className='answer'>{statusRequest}</div>)}
        </>
    );
};

export default FormTest;

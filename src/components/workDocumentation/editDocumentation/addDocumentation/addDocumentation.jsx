import { useForm } from 'react-hook-form';
import { useRequestAddDocumentation } from './requestAddDocumentation';
import iconClose from '../../../../img/icons/cross.svg';

export const AddDocumentation = ({ docName, onClose }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { sendRequest, isLoggedIn } = useRequestAddDocumentation();

    const handleClose = () => {
        onClose(false);
        reset({
            files: null,
        });
    };

    const onSubmit = async (data) => {
        try {
            await sendRequest({ docName, file: data.files[0] }); // Передаем объект с docName и файлом
            console.log('Request sent successfully');
        } catch (error) {
            console.error('Failed to send request:', error);
        }
    };

    return (
        <form className="form-container-upload" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div className='container-close'>
                <h2>Добавление документации</h2>
                <a className='link-close' onClick={handleClose}>
                    <img src={iconClose} alt="Close" />
                </a>
            </div>
            <div className='upload-file'>
                <input
                    {...register("files")} type="file" accept=".txt" id="files" name="files" required
                />
            </div>
            <button className="btn-add" type='submit'>Сохранить</button>
        </form>
    );
};
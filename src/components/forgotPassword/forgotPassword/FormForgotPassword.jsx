import {useForm} from 'react-hook-form';



function FormForgotPassword(){

    const apiUrl = process.env.REACT_APP_API_URL;
    const{
        register,
        reset,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        }).then(response => {
            alert('Проверьте почту')
            reset()
            
          })
        .catch (error => {
          console.error('Ошибка при регистрации:', error);
        })
    }

    return (
        <div class="container">
            <h2>Восстановление пароля</h2>
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <label for="email">Email:</label>
                <input {...register("email")} type="email" id="email" name="email" required />

                <button type="submit">Восстановить пароль</button>
            </form>
        </div>
    );
}

export default FormForgotPassword;
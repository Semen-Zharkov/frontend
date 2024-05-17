import {useForm} from 'react-hook-form';



function FormResetPassword(){
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    const{
        register,
        reset,
        formState:{errors,
        },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        fetch(`${apiUrl}/auth/reset-password/${token}?password=${data['password']}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'password': data['password']


        }),
        credentials: 'include'
        }).then(response => {
            reset()
            
          })
        .catch (error => {
          console.error('Ошибка при изменение пароля:', error);
        })
    }

    return (
        <div class="container">
            <h2>Изменение пароля</h2>
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <label for="password">Пароль:</label>
                <input {...register("password")} type="password" id="password" name="password" required />

                <label for="confirm-password">Подтверждение пароля:</label>
                <input {...register("confirmation_password")} type="password" id="confirm-password" required />

                <button type="submit">Изменить пароль</button>
            </form>
        </div>
    );
}

export default FormResetPassword;
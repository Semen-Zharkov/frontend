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
        <section className="container">
            <form className="form-container" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <h2>Восстановление пароля</h2>
                <div>
                    <label for="email">Email</label>
                    <input {...register("email")} type="email" id="email" name="email" required />
                </div>
                <button className='submit-form' type="submit">Восстановить пароль</button>
            </form>
        </section>
    );
}

export default FormForgotPassword;
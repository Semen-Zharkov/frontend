import { RequestUserMe } from "./usersMe";

export const LogoutComponent=() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    const logout = async () => {
    try {
        // Отправка запроса на выход пользователя
        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
        });
        // setIsLoggedIn(false);
        // Проверка успешности выполнения запроса на выход
        if (response.ok) {
            // insStateLogInFalse();
            console.log('User logged out successfully');
            // Выполните здесь необходимые действия после выхода пользователя (например, перенаправление на страницу входа)
        } else {
            console.error('Logout request failed');
        }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    logout();
}

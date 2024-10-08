import { Link, useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

export const logout = async (navigate) => {
    
    try {
        
        // Отправка запроса на выход пользователя
        const response = await fetch(`${apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include', // Убедитесь, что куки прикрепляются к запросу
        });
        // Проверка успешности выполнения запроса на выход
        if (response.ok) {
            navigate('/')
            document.location.reload();
            localStorage.clear()

        } else {
            console.error('Logout request failed');
        }
    } catch (error) {
        console.error('Logout error:', error);
    }
}

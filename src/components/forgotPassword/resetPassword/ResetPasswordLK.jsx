import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export const ResetPasswordLK = async (data) => {
    console.log(data)
    try {
        const response = await fetch(`${apiUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            alert('Данные успешно изменены')
            window.location.reload();
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
    return null;
};
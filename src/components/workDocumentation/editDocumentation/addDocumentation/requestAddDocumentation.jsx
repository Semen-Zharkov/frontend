import { useState } from "react";

export const useRequestAddDocumentation = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const sendRequest = async ({ docName, file }) => {
        try {
            
            const formDatas = new FormData();
            formDatas.append('file', file);

            const response = await fetch(`${apiUrl}/docks/add_data?doc_name=${docName}`, {
                method: 'POST', // Используем POST вместо GET
                credentials: 'include',
                body: formDatas // Отправляем FormData напрямую

            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setIsLoggedIn(true);
            return response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    return { sendRequest, isLoggedIn };
};
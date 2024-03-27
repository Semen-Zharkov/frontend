import { useState, useEffect } from "react";

export const useAuth = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState('');


    const insStateLogInTrue = () => {
        setIsLoggedIn(true);
    };

    const insStateLogInFalse = () => {
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/me`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const userData = await response.json();
                setUserData(userData);
                insStateLogInTrue();
                console.log("User data:", userData); // Вывод данных пользователя в консоль
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (!isLoggedIn) {
            fetchUserData();
        }
    }, []);

    return { isLoggedIn, userData, insStateLogInFalse, insStateLogInTrue};
};
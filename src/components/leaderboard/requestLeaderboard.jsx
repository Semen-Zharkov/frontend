import { useState, useEffect } from "react";

export const useRequastLeaderboard = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${apiUrl}/contest/leaderboard`, {
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
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                
            }
        };
        if (!isLoggedIn) {
            fetchUserData();
        }
    }, []);
    return { userData}; // Возвращаем также состояние 
};
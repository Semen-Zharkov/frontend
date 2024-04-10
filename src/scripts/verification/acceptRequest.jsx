const apiUrl = process.env.REACT_APP_API_URL;

export const AcceptRequest = async (id) =>{
    try {
        const response = await fetch(`${apiUrl}/admin/accept?request_id=${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

    } catch (error) {
        console.error("Error fetching user data:", error);
    } 
}
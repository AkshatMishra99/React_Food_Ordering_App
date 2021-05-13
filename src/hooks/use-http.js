import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendRequest = useCallback(async (taskText, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(taskText.url, {
                method: taskText.method ? taskText.method : "GET",
                headers: taskText.headers ? taskText : {},
                body: taskText.body ? JSON.stringify(taskText.body) : null,
            });
            if (!response.ok) {
                throw new Error("Request Failed!!");
            }
            const data = await response.json();
            applyData(data);
        } catch (err) {
            setError(err.message || "Something went wrong!!");
        }
        setIsLoading(false);
    }, []);
    return {
        isLoading,
        error,
        sendRequest,
    };
};
export default useHttp;

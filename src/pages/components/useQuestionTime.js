import { useEffect, useState } from "react";

const useQuestionTime = () => {
    const [questionTime, setQuestionTime] = useState(0); // Question timer (0 seconds)

    useEffect(() => {
        // Question Timer
        const questionId = setInterval(() => {
            setQuestionTime((prevTime) => prevTime + 1); // Increment time
        }, 1000);

        // Cleanup for question timer
        return () => clearInterval(questionId);
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const questionTimer = formatTime(questionTime)

    return {
        questionTimer
    }
};

export default useQuestionTime;

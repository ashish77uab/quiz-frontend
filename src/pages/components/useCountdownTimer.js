import { useEffect, useState } from "react";

const useCountdownTimer = () => {
    const [time, setTime] = useState(25 * 60); // Initial time in seconds (25 minutes)

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerId); // Clear interval when timer reaches 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId); // Cleanup on component unmount
    }, []);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const timeToReturn = formatTime(time)

    return {
        timeToReturn
    }
};

export default useCountdownTimer;

import React, { useState, useEffect } from 'react';

export default function Timer({ initialTime, onTimeUp }) {
    const [time, setTime] = useState(initialTime);
    let intervalId;

    useEffect(() => {
        intervalId = setInterval(() => {
            if (time > 0) {
                setTime(time - 1);
            } else {
                clearInterval(intervalId);
                onTimeUp();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [time, onTimeUp]);

    return (
        time
    );
}

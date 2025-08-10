import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './Stopwatch.css';

function Stopwatch() {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef(null);

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }

        return () => {
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = () => {
        const hours = Math.floor((time / (60 * 60000))).toString().padStart(2, '0');
        const minutes = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
        const milliseconds = (time % 1000).toString().padStart(3, '0').slice(0, 2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    return(
        <div className="stopwatch-page-wrapper">
            <div className="stopwatch-container">
                <div className="stopwatch-display">{formatTime()}</div>
                <div className="stopwatch-controls">
                    <button onClick={handleStartStop}>
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
                    <button onClick={handleReset}>Reset</button>
                </div>
            </div>
            <Link to='/' className="back-link">← Back to Portfolio</Link>
        </div>
    );

}

export default Stopwatch;
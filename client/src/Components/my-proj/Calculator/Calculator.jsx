import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import './Calculator.css';

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});

function formatOperand(operand){
    if(operand == null || operand === "") { return ""; }
    const number = parseFloat(operand);
    const numberString = String(operand);

    const MAX_LENGTH = 9;

    if(numberString.length > MAX_LENGTH && numberString.includes('.') === false){
        return number.toExponential(4);
    }

    const [integer, decimal] = numberString.split('.');
    if(decimal == null){ return INTEGER_FORMATTER.format(integer); }
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function Calculator() {
    const [currentOperand, setCurrentOperand] = useState('0');
    const [previousOperand, setPreviousOperand] = useState(null);
    const [operation, setOperation] = useState(null);
    const [overwrite, setOverwrite] = useState(null);

    const displayRef = useRef(null);

    useEffect(() => {
        if(displayRef.current){
            const displayElement = displayRef.current;
            displayElement.style.fontSize = '2.5rem';
    
            const displayWidth = displayElement.offsetWidth;
            const textWidth = displayElement.scrollwith;
    
            if(textWidth > displayWidth){
                const newSize = (displayWidth / textWidth) * 2.5;
                displayElement.style.fontSize = `${newSize}rem`;
            }
        }
    }, [currentOperand]);

    const appendNumber = (number) => {
        if(overwrite){
            setCurrentOperand(String(number));
            setOverwrite(false);
            return;
        }
        if(currentOperand === '0' && number === '0') { return; }
        if(number === '.' && currentOperand.includes('.')) { return; }
        setCurrentOperand(prev => (prev === '0' && number !== '.') ? String(number) : prev + number);
    };

    const chooseOperation = (op) => {
        if(currentOperand === '' && previousOperand !== null){
            setOperation(op);
        }
        if(previousOperand !== null) {
            const result = compute();
            if(result !== undefined){
                setPreviousOperand(String(result));
                setCurrentOperand('');
                setOperation(op);
            }
            return;
        }

        setOperation(op);
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);

        if(isNaN(prev) || isNaN(current)) { return; }

        switch(operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        return parseFloat(computation.toPrecision(12));
    };

    const handleEquals = () => {
        const result = compute();
        if(result !== undefined){
            setOverwrite(true);
            setCurrentOperand(String(result));
            setPreviousOperand(null);
            setOperation(null);
        }
    };

    const allClear = () => {
        setCurrentOperand('0');
        setPreviousOperand(null);
        setOperation(null);
        setOverwrite(false);
    };

    const deleteLast = () => {
        if(overwrite){
            allClear();
            return;
        }
        if(currentOperand.length === 1){
            setCurrentOperand('0');
            return;
        }
        setCurrentOperand(currentOperand.slice(0, -1));
    };

    return(
        <div className="calculator-page-wrapper">
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
                    <div ref={displayRef} className="current-operand">{formatOperand(currentOperand)}</div>
                </div>
                <button className="span-two" onClick={allClear}>AC</button>
                <button onClick={deleteLast}>⌫</button>
                <button onClick={() => chooseOperation('÷')}>÷</button>
                <button onClick={() => appendNumber(1)}>1</button>
                <button onClick={() => appendNumber(2)}>2</button>
                <button onClick={() => appendNumber(3)}>3</button>
                <button onClick={() => chooseOperation('*')}>*</button>
                <button onClick={() => appendNumber(4)}>4</button>
                <button onClick={() => appendNumber(5)}>5</button>
                <button onClick={() => appendNumber(6)}>6</button>
                <button onClick={() => chooseOperation('+')}>+</button>
                <button onClick={() => appendNumber(7)}>7</button>
                <button onClick={() => appendNumber(8)}>8</button>
                <button onClick={() => appendNumber(9)}>9</button>
                <button onClick={() => chooseOperation('-')}>-</button>
                <button onClick={() => appendNumber('.')}>.</button>
                <button onClick={() => appendNumber(0)}>0</button>
                <button className="span-two" onClick={handleEquals}>=</button>
            </div>
            <Link to='/' className="back-link">← Back to Portfolio</Link>
        </div>
    );
}

export default Calculator;
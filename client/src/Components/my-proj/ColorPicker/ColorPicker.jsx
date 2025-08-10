import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './ColorPicker.css'

function ColorPicker(){

    const [color, setColor] = useState('#FFFFFF')

    function handleColorChange(event){
        setColor(event.target.value)
    }

    return(
        <div className='color-picker-page-wrapper'>
            <div className='color-picker-container'>
                <h1>Color Picker</h1>
                <div className='color-display' style={{backgroundColor: color}}>
                <p>Selected Color: {color}</p>
                </div>
                <p>Select a Color:</p>
                <input type="color" value={color} onChange={handleColorChange}/>
            </div>
            <Link to='/' className="back-link">← Back to Portfolio</Link>
        </div>
    )
}

export default ColorPicker
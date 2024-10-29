import React, { useState } from "react";
import './MainBtn.css';
export default function MainBtn({name, hoverbgColor, hoverTextColor, textColor, borderColor, bgColor}){
    const [isHovered, setisHovered]= useState(false);
    const handleMouseOver=()=>{setisHovered(true)};
    const handleMouseLeave=()=>{setisHovered(false)};
    const customBtn={
        backgroundColor: `${isHovered ? hoverbgColor : bgColor}`,
        padding: '15px 30px',
        border: `1px solid ${borderColor}`,
        cursor: 'pointer',
        color:`${isHovered ? hoverTextColor : textColor}`,
        transition: 'background-color 0.3s ease',
    }
    return(
        <button
            className="custom-button"
            style={customBtn}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            >
            {name}
        </button>
    )
}
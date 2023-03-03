import React from "react";

import backgroundBlue from "../../img/text-color/backgroun-Blue.png";
import backgroundBrown from "../../img/text-color/backgroun-Brown.png";
import backgroundDefault from "../../img/text-color/backgroun-Default.png";
import backgroundGray from "../../img/text-color/backgroun-Gray.png";
import backgroundGreen from "../../img/text-color/backgroun-Green.png";
import backgroundOrange from "../../img/text-color/backgroun-Orange.png";
import backgroundPink from "../../img/text-color/backgroun-Pink.png";
import backgroundPurple from "../../img/text-color/backgroun-Purple.png";
import backgroundRed from "../../img/text-color/backgroun-Red.png";
import backgroundYellow from "../../img/text-color/backgroun-Yellow.png";

import { changeStyle } from "../../hooks/useEditTextFun";

const TextColor = ({ textColorRef, setEditText }) => {
    const changeTextColorHandler = (e, color) => {
        e.preventDefault();
        changeStyle(color, color, setEditText);
    };

    const options = [
        {
            name: "Default",
            color: "#000000",
            img: backgroundDefault,
            className: "backgroun-Default",
        },
        {
            name: "Gray",
            color: "#f1f1ef",
            img: backgroundGray,
            className: "backgroun-Gray",
        },
        {
            name: "Brown",
            color: "#f4eeee",
            img: backgroundBrown,
            className: "backgroun-Brown",
        },
        {
            name: "Orange",
            color: "#fbecdd",
            img: backgroundOrange,
            className: "backgroun-Orange",
        },
        {
            name: "Yellow",
            color: "#fbf3db",
            img: backgroundYellow,
            className: "backgroun-Yellow",
        },
        {
            name: "Green",
            color: "#edf3ec",
            img: backgroundGreen,
            className: "backgroun-Green",
        },
        {
            name: "Blue",
            color: "#e7f3f8",
            img: backgroundBlue,
            className: "backgroun-Blue",
        },
        {
            name: "Purple",
            color: "#f6f3f8",
            img: backgroundPurple,
            className: "backgroun-Purple",
        },
        {
            name: "Pink",
            color: "#faf1f5",
            img: backgroundPink,
            className: "backgroun-Pink",
        },
        {
            name: "Red",
            color: "#fdebec",
            img: backgroundRed,
            className: "backgroun-Red",
        },
    ];

    return (
        <div className="text-color" ref={textColorRef}>
            {options.map((option, index) => (
                <div
                    key={index}
                    className="text-color-content"
                    onClick={(e) => changeTextColorHandler(e, option.className)}
                >
                    <div className="text-color-content-item">
                        <img
                            className="text-color-content-img"
                            src={option.img}
                        />
                        <div className="text-color-content-name">
                            {option.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TextColor;

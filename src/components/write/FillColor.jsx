import React from "react";

import colorBlue from "../../img/color/color-Blue.png";
import colorBrown from "../../img/color/color-Brown.png";
import colorDefault from "../../img/color/color-Default.png";
import colorGray from "../../img/color/color-Gray.png";
import colorGreen from "../../img/color/color-Green.png";
import colorOrange from "../../img/color/color-Orange.png";
import colorPink from "../../img/color/color-Pink.png";
import colorPurple from "../../img/color/color-Purple.png";
import colorRed from "../../img/color/color-Red.png";
import colorYellow from "../../img/color/color-Yellow.png";

import { changeStyle } from "../../hooks/useEditTextFun";

const FillColor = ({ fillColorRef, setEditText }) => {
    const changeFillColorHandler = (e, color) => {
        e.preventDefault();
        changeStyle(color, color, setEditText);
    };

    const options = [
        {
            name: "Default",
            color: "#000000",
            img: colorDefault,
            className: "color-Default",
        },
        {
            name: "Gray",
            color: "#808080",
            img: colorGray,
            className: "color-Gray",
        },
        {
            name: "Brown",
            color: "#A52A2A",
            img: colorBrown,
            className: "color-Brown",
        },
        {
            name: "Orange",
            color: "#FFA500",
            img: colorOrange,
            className: "color-Orange",
        },
        {
            name: "Yellow",
            color: "#CB912F",
            img: colorYellow,
            className: "color-Yellow",
        },
        {
            name: "Green",
            color: "#008000",
            img: colorGreen,
            className: "color-Green",
        },
        {
            name: "Blue",
            color: "#0000FF",
            img: colorBlue,
            className: "color-Blue",
        },
        {
            name: "Purple",
            color: "#800080",
            img: colorPurple,
            className: "color-Purple",
        },
        {
            name: "Pink",
            color: "#FF1493",
            img: colorPink,
            className: "color-Pink",
        },
        {
            name: "Red",
            color: "#FF0000",
            img: colorRed,
            className: "color-Red",
        },
    ];

    return (
        <div className="color-picker" ref={fillColorRef}>
            {options.map((option, index) => (
                <div
                    key={index}
                    className="color-picker-content"
                    onClick={(e) => changeFillColorHandler(e, option.className)}
                >
                    <div className="color-picker-content-item">
                        <img
                            className="color-picker-content-img"
                            src={option.img}
                        />
                        <div className="color-picker-content-name">
                            {option.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FillColor;

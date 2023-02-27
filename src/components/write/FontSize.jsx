import React from "react";

import fontSizeDefault from "../../img/icons8-paste-as-text-48.png";
import header1 from "../../img/font-size/header-1.png";
import header2 from "../../img/font-size/header-2.png";
import header3 from "../../img/font-size/header-3.png";
import alignJustify from "../../img/font-size/align-justify.png";
import alignLeft from "../../img/font-size/align-left.png";
import alignRight from "../../img/font-size/align-right.png";

import { changeStyle, changeFontSize } from "../../hooks/useEditTextFun";

const FontSize = ({ fontSizeRef }) => {
    const changeFontSizeHandler = (
        e,
        className
        // style1,
        // style2
    ) => {
        e.preventDefault();
        changeFontSize(className, "size-default");
        // changeFontSize(style1, style2);
    };

    const options = [
        {
            name: "Default",
            img: fontSizeDefault,
            // style1: "24px",
            // style2: "",
            className: "size-default",
        },
        {
            name: "Heading 1",
            img: header1,
            // style1: "1.875em",
            // style2: "600",
            className: "size-h1",
        },
        {
            name: "Heading 2",
            img: header2,
            // style1: "1.5em",
            // style2: "600",
            className: "size-h2",
        },
        {
            name: "Heading 3",
            img: header3,
            // style1: "1.25em",
            // style2: "600",
            className: "size-h3",
        },
        // {
        //     name: "Align-Justify",
        //     img: alignJustify,
        //     // style1: "1.25em",
        //     // style2: "600",
        //     className: "size-align-justify",
        // },
        // {
        //     name: "Align-Left",
        //     img: alignLeft,
        //     // style1: "1.25em",
        //     // style2: "600",
        //     className: "size-align-left",
        // },
        // {
        //     name: "Align-Right",
        //     img: alignRight,
        //     // style1: "1.25em",
        //     // style2: "600",
        //     className: "size-align-right",
        // },
    ];

    return (
        <div className="font-size" ref={fontSizeRef}>
            {options.map((option, index) => (
                <div
                    key={index}
                    className="font-size-content"
                    onClick={(e) =>
                        changeFontSizeHandler(
                            e,
                            option.className
                            // option.style1,
                            // option.style2
                        )
                    }
                >
                    <div className="font-size-content-item">
                        <img
                            className="font-size-content-img"
                            src={option.img}
                        />
                        <div className="font-size-content-name">
                            {option.name}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FontSize;

import React, { useState, useRef, useEffect } from "react";

import FontSize from "./FontSize";
import FillColor from "./FillColor";
import TextColor from "./TextColor";

import bold from "../../img/bold.png";
import italic from "../../img/italic.png";
import underline from "../../img/underline.png";
import textColor from "../../img/fill-color.png";
import fontSize from "../../img/icons8-paste-as-text-48.png";
// import fontSize from "../../img/fontSize.png";
import addImage from "../../img/add-image.png";

import colorDefault from "../../img/color/color-Default.png";

import { changeStyle } from "../../hooks/useEditTextFun";

const EditText = ({ setEditText }) => {
    const editTextRef = useRef(null);
    /// * 設定字體大小 * ///
    const [showFontSize, setShowFontSize] = useState(false);

    const fontSizeRef = useRef(null);

    const fontSizeClickOutside = (e) => {
        if (fontSizeRef.current && !fontSizeRef.current.contains(e.target)) {
            setShowFontSize(false);
        }
    };

    const showFontSizeHandler = (e) => {
        e.preventDefault();
        setShowFontSize(!showFontSize);
    };

    /// * 字體粗細 * ///
    const changeBoldHandler = (e) => {
        e.preventDefault();
        changeStyle("bold", "unbold");
    };
    /// * 字體斜線 * ///
    const changeItalicHandler = (e) => {
        e.preventDefault();
        changeStyle("italic", "unitalic");
    };
    /// * 字體底線 * ///
    const changeUnderlineHandler = (e) => {
        e.preventDefault();
        changeStyle("underline", "nounderline");
    };
    /// * 字體顏色 * ///
    const [showFillColor, setShowFillColor] = useState(false);

    const fillColorRef = useRef(null);

    const fillColorClickOutside = (e) => {
        if (fillColorRef.current && !fillColorRef.current.contains(e.target)) {
            setShowFillColor(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", fillColorClickOutside, true);
        document.addEventListener("click", textColorClickOutside, true);
        document.addEventListener("click", fontSizeClickOutside, true);
        return () => {
            document.removeEventListener("click", fillColorClickOutside, true);
            document.removeEventListener("click", textColorClickOutside, true);
            document.removeEventListener("click", fontSizeClickOutside, true);
        };
    }, []);

    const showFillColorHandler = (e) => {
        e.preventDefault();
        setShowFillColor(!showFillColor);
    };

    /// * 字體底色 * ///
    const [showTextColor, setShowTextColor] = useState(false);

    const textColorRef = useRef(null);

    const textColorClickOutside = (e) => {
        if (textColorRef.current && !textColorRef.current.contains(e.target)) {
            setShowTextColor(false);
        }
    };

    const showTextColorHandler = (e) => {
        e.preventDefault();
        setShowTextColor(!showTextColor);
    };

    /// * 監聽鍵盤 * ///
    const keyboardHander = (e) => {
        if (e.keyCode === 13) {
            const range = window
                .getSelection()
                .getRangeAt(0).commonAncestorContainer;
            range.setAttribute("class", "");
        }
    };
    /// * 限制輸入字數長度 * ///
    const MAX_LENGTH = 3000;

    /// * 取得輸入內容 * ///
    const writeHandler = (e) => {
        const text = e.target.innerHTML;

        if (text.length > MAX_LENGTH) {
            e.target.innerHTML = text.slice(0, MAX_LENGTH);
        }
        setEditText(text);
    };

    return (
        <div className="edit-text-content">
            <div className="text-editor-tools">
                <button
                    className="font-size-div text-editor-tools-button"
                    onClick={showFontSizeHandler}
                >
                    <img className="text-editor-tools-img" src={fontSize} />
                    {showFontSize ? (
                        <FontSize fontSizeRef={fontSizeRef} />
                    ) : null}
                </button>
                <button
                    className="text-editor-tools-button"
                    onClick={changeBoldHandler}
                >
                    <img className="text-editor-tools-img" src={bold} />
                </button>
                <button
                    className="text-editor-tools-button"
                    onClick={changeItalicHandler}
                >
                    <img className="text-editor-tools-img" src={italic} />
                </button>
                <button
                    className="text-editor-tools-button"
                    onClick={changeUnderlineHandler}
                >
                    <img className="text-editor-tools-img" src={underline} />
                </button>
                <button
                    className="fill-color-div text-editor-tools-button"
                    onClick={showFillColorHandler}
                >
                    <img className="text-editor-tools-img" src={colorDefault} />
                    {showFillColor ? (
                        <FillColor fillColorRef={fillColorRef} />
                    ) : null}
                </button>
                <button
                    className="text-color-div text-editor-tools-button"
                    onClick={showTextColorHandler}
                >
                    <img className="text-editor-tools-img" src={textColor} />
                    {showTextColor ? (
                        <TextColor textColorRef={textColorRef} />
                    ) : null}
                </button>
                <button className="text-editor-tools-button">
                    <img className="text-editor-tools-img" src={addImage} />
                </button>
            </div>
            <div
                ref={editTextRef}
                suppressContentEditableWarning={true}
                contentEditable={true}
                spellCheck={false}
                className="edit-text"
                onKeyUp={keyboardHander}
                onInput={writeHandler}
            />
        </div>
    );
};

export default EditText;

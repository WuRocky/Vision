import React, { useState, useRef, useEffect } from "react";

import FontSize from "./FontSize";
import FillColor from "./FillColor";
import TextColor from "./TextColor";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import bold from "../../img/bold.png";
import italic from "../../img/italic.png";
import underline from "../../img/underline.png";
import textColor from "../../img/fill-color.png";
import fontSize from "../../img/icons8-paste-as-text-48.png";

import addImage from "../../img/add-image.png";

import colorDefault from "../../img/color/color-Default.png";

import { changeStyle } from "../../hooks/useEditTextFun";

const EditText = ({ setEditText, editText }) => {
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
        changeStyle("bold", "unbold", setEditText);
    };
    /// * 字體斜線 * ///
    const changeItalicHandler = (e) => {
        e.preventDefault();
        changeStyle("italic", "unitalic", setEditText);
    };
    /// * 字體底線 * ///
    const changeUnderlineHandler = (e) => {
        e.preventDefault();
        changeStyle("underline", "nounderline", setEditText);
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

    /// * 選擇顯示編輯或預覽內容 * ///
    const [switchContent, setSwitchContent] = useState("edit-text-item-1");

    /// * 限制輸入字數長度 * ///
    const MAX_LENGTH = 3000;

    /// * 取得輸入內容 * ///
    const writeHandler = (e) => {
        const text = e.target.innerHTML;
        const replacedText = text
            .replace(/<div>/g, "\n")
            .replace(/<\/div>/g, "");
        if (replacedText.length > MAX_LENGTH) {
            e.target.innerHTML = replacedText
                .slice(0, MAX_LENGTH)
                .replace(/\n/g, "<div><br></div>");
        } else {
            setEditText(replacedText);
        }
    };
    /// * 監聽鍵盤 * ///
    const keyboardHander = (e) => {
        if (e.keyCode === 13) {
            const range = window.getSelection().getRangeAt(0);
            const currentBlock = document.createElement("div");
            currentBlock.appendChild(range.cloneContents());

            // 獲取父元素的標籤名
            const currentTagName =
                range.startContainer.parentNode.tagName.toLowerCase();

            const div = document.createElement("div");
            range.insertNode(div);
            range.setStartAfter(div);
            range.collapse(true);

            // 如果當前塊是標題，則將下一個塊設置為相同的標籤名稱
            if (currentTagName.match(/h[1-6]/)) {
                const nextBlock = document.createElement(currentTagName);
                nextBlock.innerHTML = "<br>";
                div.parentNode.insertBefore(nextBlock, div.nextSibling);
            }
            e.preventDefault();
        }
    };

    const handlePaste = (e) => {
        // 防止預設的黏貼事件，使得你的元素只接受純文字
        e.preventDefault();
        // 獲取剪貼簿中的純文字內容
        const text = e.clipboardData.getData("text");

        // 在這裡處理你的黏貼事件，可以將黏貼的內容以特定的格式插入到 `contentEditable` 元素中
        // 插入純文字
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        const range = selection.getRangeAt(0);
        const newNode = document.createElement("p");
        newNode.innerHTML = "&nbsp;"; // 插入空段落
        range.insertNode(newNode);
        newNode.innerHTML = text; // 設置新節點的內容
        range.setEndAfter(newNode); // 將選區的結束位置設置在新節點後面
        range.setStartAfter(newNode); // 將選區的開始位置設置在新節點後面
        selection.removeAllRanges(); // 刪除原有選區
        selection.addRange(range); // 添加新選區
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
                        <FontSize
                            fontSizeRef={fontSizeRef}
                            setEditText={setEditText}
                        />
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
                        <FillColor
                            fillColorRef={fillColorRef}
                            setEditText={setEditText}
                        />
                    ) : null}
                </button>
                <button
                    className="text-color-div text-editor-tools-button"
                    onClick={showTextColorHandler}
                >
                    <img className="text-editor-tools-img" src={textColor} />
                    {showTextColor ? (
                        <TextColor
                            textColorRef={textColorRef}
                            setEditText={setEditText}
                        />
                    ) : null}
                </button>
                {/* <button className="text-editor-tools-button">
                    <img className="text-editor-tools-img" src={addImage} />
                </button> */}
            </div>
            {/* 編輯內容 */}
            <div
                className={`edit-text-item-1 ${
                    switchContent === "edit-text-item-1" ? "show" : ""
                }`}
            >
                <div
                    ref={editTextRef}
                    suppressContentEditableWarning={true}
                    contentEditable={true}
                    spellCheck={false}
                    className="edit-text"
                    onKeyUp={keyboardHander}
                    onInput={writeHandler}
                    onPaste={handlePaste}
                />
            </div>
            {/* 預覽內容 */}
            <div
                className={`preview-itme-1  ${
                    switchContent === "preview-itme-1" ? "show" : ""
                }`}
            >
                {/* <ReactMarkdown className="preview">{editText}</ReactMarkdown> */}
                <ReactMarkdown
                    className="preview"
                    children={editText}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(
                                className || ""
                            );
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(
                                        /\n$/,
                                        ""
                                    )}
                                    style={tomorrowNightBlue}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                />
            </div>
            <div className="switch-components">
                <div className="switch-item">
                    <div
                        style={{
                            color:
                                switchContent === "edit-text-item-1"
                                    ? "black"
                                    : "gray",
                        }}
                        onClick={() => setSwitchContent("edit-text-item-1")}
                    >
                        編輯內容
                    </div>
                    <div
                        style={{
                            color:
                                switchContent === "preview-itme-1"
                                    ? "black"
                                    : "gray",
                        }}
                        onClick={() => setSwitchContent("preview-itme-1")}
                    >
                        預覽內容
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditText;

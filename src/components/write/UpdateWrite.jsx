// react
import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import noImage from "../../img/no-Image.png";

// firebase
import { updateUserArticleContent } from "../../hooks/useFireStore";
import { upDataStorage } from "../../hooks/useFireStorage";

import UpdateEditText from "./UpdateEditText";

import Message from "../message/Message";

import { AppContext } from "../../Layout";
import { getArticle } from "../../hooks/useFireStore";
const UpdateWrite = () => {
    const { id } = useParams();
    useEffect(() => {
        getArticle(id, (data) => {
            setWriteTitle(data.title);
            setEditTextValue(data.content);
            setEditText(data.content);
            setWriteFile(data.imageUrl);
        });
    }, [id]);

    /// * 共用分類 * ///
    const { topics } = useContext(AppContext);

    /// * 標題內容 * ///
    const [writeTitel, setWriteTitle] = useState("");

    /// * 分類內容 * ///
    const [writeClass, setWriteClass] = useState("");

    /// * 編輯內容 * ///
    const [editText, setEditText] = useState("");

    /// * 取得原始資料 * ///
    const [editTextValue, setEditTextValue] = useState("");

    /// * 上傳照片內容 * ///
    const [writeFile, setWriteFile] = useState(null);

    /// * 顯示輸入訊息 * ///
    const [message, setMessage] = useState(null);

    /// * 禁止按鈕 * ///
    const [buttonDisabled, setButtonDisabled] = useState(false);

    /// * 加載中 * ///
    const [isLoading, setIsLoading] = useState(false);

    /// * 得到輸入照片 * ///
    const fileInput = useRef(null);

    /// * 標題 * ///
    const inputWriteTitel = (e) => {
        setWriteTitle(e.target.value);
    };

    /// * 分類 * ///
    const inputWriteClass = (e) => {
        setWriteClass(e.target.value);
    };

    /// * 上傳圖片 * ///
    const writeFileHandler = (e) => {
        e.preventDefault();
        fileInput.current.click();
    };

    const writeFileCancelHandler = (e) => {
        e.preventDefault();
        setWriteFile();
    };

    const previewUrl = writeFile
        ? typeof writeFile === "string"
            ? writeFile
            : URL.createObjectURL(new Blob([writeFile]))
        : noImage;

    /// * 導向網址 * ///
    const navigate = useNavigate();
    ///* 寫入文章 *///
    const buttonHandler = async (e) => {
        e.preventDefault();
        /// * 查看是否輸入內容 * ///
        if (editText === "" || writeTitel === "" || writeClass === "") {
            setMessage("請輸入內容");
            return;
        }

        setIsLoading(true);
        setButtonDisabled(true);

        if (writeFile && typeof writeFile !== "string") {
            const fileType = writeFile.type;
            await upDataStorage(id, writeFile, fileType);
        }
        const success = updateUserArticleContent(
            id,
            writeTitel,
            editText,
            writeClass,
            setMessage
        );

        /// * 清除輸入內容 * ///
        setEditText("");
        setWriteTitle("");
        setWriteFile(null);

        /// * 成功導向首頁 * ///
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            setButtonDisabled(false);
        }
    };
    return (
        <>
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <div className="UpdateMarkdown">
                <div className="write-main ">
                    <form className="write-content">
                        {/* 標題 */}
                        <div className="write-content-title-item">
                            <label
                                htmlFor="write-content-title"
                                className="write-content-title"
                            >
                                標題
                            </label>
                            <input
                                id="write-content-title"
                                type="text"
                                onChange={inputWriteTitel}
                                value={writeTitel}
                                className="write-content-title-input"
                            />
                        </div>
                        {/* 分類 */}
                        <div className="write-content-class-item">
                            <label className="write-content-label">分類</label>
                            <div className="write-content-class-input">
                                {topics.map((data, index) => {
                                    return (
                                        <div className="form-check" key={index}>
                                            <label
                                                className="form-check-label"
                                                htmlFor={data.name}
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="edit-text-class"
                                                    id={data.name}
                                                    value={data.name}
                                                    onChange={inputWriteClass}
                                                />
                                                <span className="form-check-span">
                                                    {data.name}
                                                </span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 寫入文章 */}
                        <div className="edit-text-item">
                            <UpdateEditText
                                setEditText={setEditText}
                                editText={editText}
                                setEditTextValue={setEditTextValue}
                                editTextValue={editTextValue}
                            />
                        </div>

                        {/* 上傳圖片 */}
                        <div className="write-content-file-item">
                            <div className="write-content-file-button">
                                <button
                                    htmlFor="write-content-file"
                                    onClick={writeFileHandler}
                                >
                                    上傳圖片
                                </button>
                                <button
                                    htmlFor="write-content-file"
                                    onClick={writeFileCancelHandler}
                                >
                                    取消圖片
                                </button>
                            </div>
                            <img
                                src={previewUrl}
                                className="write-content-file"
                            />
                        </div>
                        <div className="write-content-button-item">
                            <button
                                onClick={buttonHandler}
                                className="write-content-button"
                                disabled={buttonDisabled}
                            >
                                {isLoading ? "isLoading..." : "更新文章"}
                            </button>
                        </div>
                    </form>
                </div>
                <input
                    id="write-content-file-input"
                    ref={fileInput}
                    type="file"
                    className="write-content-file-input"
                    onChange={(e) => {
                        setWriteFile(e.target.files[0]);
                    }}
                />
            </div>
        </>
    );
};

export default UpdateWrite;

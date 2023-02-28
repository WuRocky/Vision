import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

// firebase

import { addData } from "../hooks/useFireStore";
import { addStorage } from "../hooks/useFireStorage";

import Message from "../components/message/Message";

import { AppContext } from "../Layout";
// import Markdown from "../components/write/Markdown";
import EditText from "../components/write/EditText";
const Write = () => {
    /// * 共用分類 * ///
    const { topics } = useContext(AppContext);

    /// * 標題內容 * ///
    const [writeTitel, setWriteTitle] = useState("");

    /// * 分類內容 * ///
    const [writeClass, setWriteClass] = useState("");

    /// * 輸入內容 * ///
    const [editText, setEditText] = useState("");

    /// * 上傳照片內容 * ///
    const [writeFile, setWriteFile] = useState(null);

    /// * 顯示輸入訊息 * ///
    const [message, setMessage] = useState(null);

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
        ? URL.createObjectURL(writeFile)
        : "https://react.semantic-ui.com/images/wireframe/image.png";

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

        const success = await addData(
            writeTitel,
            editText,
            writeClass,
            setMessage
        );

        /// * 得到照片輸入至fire storage * ///
        const fileId = success.id;
        if (writeFile) {
            const fileType = writeFile.type;
            addStorage(fileId, writeFile, fileType);
        }

        /// * 清除輸入內容 * ///
        setEditText("");
        setWriteTitle("");
        setWriteFile(null);

        /// * 成功導向首頁 * ///
        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };

    return (
        <>
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <div className="write">
                <div className="write-main">
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
                                                <span> {data.name}</span>
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* 寫入文章 */}
                        {/* <textarea className="textarea" onChange={writeHandler} /> */}
                        <div className="edit-text-item">
                            <EditText
                                setEditText={setEditText}
                                editText={editText}
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
                            >
                                送出文章
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

export default Write;

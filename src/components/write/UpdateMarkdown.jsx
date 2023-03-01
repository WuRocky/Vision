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

import Message from "../message/Message";

import { AppContext } from "../../Layout";
import { getArticle } from "../../hooks/useFireStore";
const UpdateMarkdown = () => {
    const { id } = useParams();
    const { topics } = useContext(AppContext);
    const [markDownTitel, setMarkDownTitle] = useState("");
    const [markDownClass, setMarkDownClass] = useState("");
    const [markDown, setMarkdown] = useState("");
    const [markDownFile, setMarkDownFile] = useState("");
    useEffect(() => {
        getArticle(id, (data) => {
            setMarkDownTitle(data.title);
            setMarkdown(data.content);
            setMarkDownFile(data.imageUrl);
        });
    }, [id]);

    const [message, setMessage] = useState(null);
    ///* 標題 *///
    const inputMarkDownTitel = (e) => {
        setMarkDownTitle(e.target.value);
    };

    ///* 分類 *///
    const inputMarkDownClass = (e) => {
        setMarkDownClass(e.target.value);
    };

    ///* 上傳圖片 *///
    const markDownFileHandle = (e) => {
        e.preventDefault();
        fileInput.current.click();
    };

    const previewUrl = markDownFile
        ? typeof markDownFile === "string"
            ? markDownFile
            : URL.createObjectURL(new Blob([markDownFile]))
        : noImage;

    ///* 寫入文章 *///
    const markDonwHandler = (e) => {
        setMarkdown(e.target.value);
    };
    const navigate = useNavigate();

    const buttonHandler = (e) => {
        e.preventDefault();

        if (markDown === "" || markDownTitel === "" || markDownClass === "") {
            setMessage("請輸入內容");
            return;
        }

        const success = updateUserArticleContent(
            id,
            markDownTitel,
            markDown,
            markDownClass,
            setMessage
        );

        if (markDownFile) {
            const fileType = markDownFile.type;
            upDataStorage(id, markDownFile, fileType);
        }

        setMarkdown("");
        setMarkDownTitle("");
        setMarkDownFile(null);

        if (success) {
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };
    const fileInput = useRef(null);
    return (
        <div className="UpdateMarkdown">
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <form className="markDownContainer">
                {/* 標題 */}
                <label htmlFor="markDownTitle" className="markDownTitle">
                    標題
                </label>
                <input
                    id="markDownTitle"
                    type="text"
                    onChange={inputMarkDownTitel}
                    value={markDownTitel}
                    className="markDownTitelInput"
                />
                {/* 分類 */}

                <label className="markDownClassLabel">分類</label>
                <div className="markDownClassInput">
                    {topics.map((data, index) => {
                        return (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="markDownClass"
                                    id={data.name}
                                    value={data.name}
                                    onChange={inputMarkDownClass}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={data.name}
                                >
                                    {data.name}
                                </label>
                            </div>
                        );
                    })}
                </div>

                {/* 寫入文章 */}
                <textarea
                    className="textarea"
                    onChange={markDonwHandler}
                    value={markDown}
                />
                <ReactMarkdown
                    className="output"
                    children={markDown}
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

                {/* 上傳圖片 */}
                <img src={previewUrl} className="markDownFile" />
                <div className="markDownFileButton">
                    <button htmlFor="markDownFile" onClick={markDownFileHandle}>
                        上傳圖片
                    </button>
                </div>

                <input
                    id="markDownFile"
                    ref={fileInput}
                    type="file"
                    className="markDownFileInput"
                    onChange={(e) => {
                        setMarkDownFile(e.target.files[0]);
                    }}
                />

                <button onClick={buttonHandler} className="markDownButton">
                    更新文章
                </button>
            </form>
        </div>
    );
};

export default UpdateMarkdown;
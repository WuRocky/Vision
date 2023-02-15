// react
import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// firebase
import { addData } from "../../hooks/useFireStore";
import { addStorage } from "../../hooks/useFireStorage";

import Message from "../message/Message";

import { AppContext } from "../../Layout";
import { getArticle } from "../../hooks/useFireStore";
const UpdateMarkdown = () => {
    const { id } = useParams();

    const [updateMarkdown, setUpdateMarkdown] = useState({
        author: {},
    });
    useEffect(() => {
        const unsubscribe = getArticle(id, (data) => {
            setMarkDownTitle(data.title);
            // setUpdateMarkdown(data.content);
            setMarkdown(data.content);
            setMarkDownFile(data.imageUrl);
        });
        return unsubscribe;
    }, [id]);

    const { topics } = useContext(AppContext);
    const [markDownTitel, setMarkDownTitle] = useState("");
    const [markDownClass, setMarkDownClass] = useState("");
    const [markDown, setMarkdown] = useState("");
    const [markDownFile, setMarkDownFile] = useState(null);

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

    const previeUrl = markDownFile
        ? markDownFile
        : "https://react.semantic-ui.com/images/wireframe/image.png";

    ///* 寫入文章 *///
    const markDonwHandler = (e) => {
        setMarkdown(e.target.value);
    };
    const navigate = useNavigate();

    const buttonHandler = async (e) => {
        e.preventDefault();

        if (markDown === "" || markDownTitel === "" || markDownClass === "") {
            setMessage("請輸入內容");
            return;
        }

        const success = await addData(
            markDownTitel,
            markDown,
            markDownClass,
            setMessage
        );
        const fileId = success.id;
        if (markDownFile) {
            const fileType = markDownFile.type;
            addStorage(fileId, markDownFile, fileType);
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
                <img src={previeUrl} className="markDownFile" />
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
                    送出文章
                </button>
            </form>
        </div>
    );
};

export default UpdateMarkdown;

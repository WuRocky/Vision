// react
import { useState } from "react";

// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// firebase
import { db } from "../lib/firebase/initialize";
import { collection, addDoc } from "firebase/firestore";

// uuid
import { v4 as uuidv4 } from "uuid";

const Markdown = () => {
    const [markDown, setMarkdown] = useState();
    const [markDownTitel, setMarkDownTitle] = useState();

    const inputMarkDownTitel = (e) => {
        setMarkDownTitle(e.target.value);
    };
    const markDonwHandler = (e) => {
        setMarkdown(e.target.value);
    };
    const buttonHandler = (e) => {
        e.preventDefault();
        if (markDown === "" && markDownTitel === "") {
            alert("請輸入文字");
            return;
        }
        let uid = uuidv4();
        const addData = async () => {
            try {
                const docRef = await addDoc(collection(db, "article"), {
                    content: markDown,
                    title: markDownTitel,
                    id: uid,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        };

        addData();
        setMarkdown("");
        setMarkDownTitle("");
    };
    return (
        <form className="markDownContainer">
            <label htmlFor="markDownTitle" className="markDownTitle">
                標題
            </label>
            <input
                id="markDownTitle"
                type="text"
                onChange={inputMarkDownTitel}
                value={markDownTitel}
                className="markDownInput"
            />
            <textarea
                className="textarea"
                value={markDown}
                onChange={markDonwHandler}
            />
            <ReactMarkdown
                className="output"
                children={markDown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
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
            <button onClick={buttonHandler} className="markDownButton">
                送出文章
            </button>
        </form>
    );
};

export default Markdown;

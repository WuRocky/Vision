import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { db } from "../lib/firebase/initialize";
import { collection, addDoc } from "firebase/firestore";

const Markdown = () => {
    const [markDown, setMarkdown] = useState();
    const markDonwHandler = (e) => {
        setMarkdown(e.target.value);
    };
    const buttonHandler = (e) => {
        e.preventDefault();
        if (markDown === "") {
            alert("請輸入文字");
            return;
        }
        const testAsync = async () => {
            try {
                const docRef = await addDoc(collection(db, "article"), {
                    content: markDown,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        };

        testAsync();
        setMarkdown("");
    };
    return (
        <form className="markDownContainer">
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
                新增紀錄
            </button>
        </form>
    );
};

export default Markdown;

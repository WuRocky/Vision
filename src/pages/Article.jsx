import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import userPhoto from "../../img/user.png";
import userPhoto from "../img/user.png";
// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import good from "../img/good.png";
import messages from "../img/messages.png";

import { getArticle } from "../hooks/useFireStore";

const Article = () => {
    const { id } = useParams();
    const [writeData, setWriteData] = useState({
        author: {},
        // time: {},
    });

    useEffect(() => {
        getArticle(id, setWriteData);
    }, []);

    return (
        <div className="article">
            <div className="article-author">
                <div>
                    {writeData.author.photoURL ? (
                        <img src="writeData.author.photoURL" />
                    ) : (
                        <img src={userPhoto} />
                    )}
                </div>
                <div>{writeData.topic}</div>
                <div>{writeData.author.displayName || "匿名"}</div>
                {/* <p>{result2}</p> */}
                <p>{writeData.time?.toDate().toLocaleDateString("zh-TW")}</p>
            </div>
            <div className="article-title">
                <h1>{writeData.title}</h1>
            </div>
            <div className="article-markdown">
                <ReactMarkdown
                    children={writeData.content}
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
            <div className="article-feel">
                <div>
                    <img src={good} />
                </div>
                <div>
                    <img src={messages} />
                </div>
            </div>
        </div>
    );
};

export default Article;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { db } from "../lib/firebase/initialize";
import { collection, query, where, getDocs } from "firebase/firestore";

const Article = () => {
    const { id } = useParams();

    const [writeData, setWriteData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, "article"), where("id", "==", id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length > 0) {
                setWriteData(querySnapshot.docs[0].data());
            }
        };
        getData();
    }, []);
    return (
        <div className="article">
            <div className="articleTitle">
                <h1>{writeData.title}</h1>
            </div>
            <div className="articleMarkdown">
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
        </div>
    );
};

export default Article;

import React, { useContext, useCallback } from "react";
import userPhoto from "../../img/user.png";
import { AppContext } from "../../Layout";
import { useNavigate, Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import message from "../../img/messages.png";

const HomePageContent = () => {
    const { firebaseTwoDoc, user } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    return (
        <div className="homepage-content">
            {firebaseTwoDoc.map((data, index) => {
                return (
                    <Link
                        key={data.id}
                        onClick={() => handleClick(data.id)}
                        to={`/article/${data.id}`}
                        className={`homepage-content-item ${
                            index > 0 ? "borderTop" : ""
                        }`}
                    >
                        <div className="homepage-content-item-1">
                            <div>
                                {data.author.photoURL ? (
                                    <img
                                        className="homepage-content-item-1-userPhoto"
                                        src={data.author.photoURL}
                                    />
                                ) : (
                                    <img src={userPhoto} />
                                )}
                            </div>
                            <div>{data.topic}</div>
                            <div>{data.author.displayName || "匿名"}</div>
                        </div>
                        <div className="homepage-content-item-2">
                            <div className="homepage-content-item-2-title">
                                {data.title}
                            </div>
                            <p className="homepage-content-item-2-article">
                                {/* {data.content} */}

                                <ReactMarkdown
                                    children={data.content}
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: "h4",
                                        h2: "h5",
                                        h3: "h6",
                                        code({
                                            node,
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {
                                            const match = /language-(\w+)/.exec(
                                                className || ""
                                            );
                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    children={String(
                                                        children
                                                    ).replace(/\n$/, "")}
                                                    style={tomorrowNightBlue}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    {...props}
                                                />
                                            ) : (
                                                <code
                                                    className={className}
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                />
                            </p>
                            <img
                                className="homepage-content-item-2-img"
                                src={
                                    data.imageUrl ||
                                    "https://react.semantic-ui.com/images/wireframe/image.png"
                                }
                            />
                        </div>
                        <div className="homepage-content-item-3">
                            <div className="homepage-content-item-3-like">
                                <img src={likeGray} />
                                <div>{data.likeUserId?.length || 0}</div>
                            </div>
                            <div className="homepage-content-item-3-message">
                                <img src={message} />
                                <div>
                                    {data.commentsContent
                                        ? data.commentsContent
                                        : 0}
                                </div>
                            </div>
                            <div className="homepage-content-item-3-like">
                                {user ? (
                                    <img
                                        src={
                                            data.trackUserId?.length &&
                                            data.trackUserId.includes(user?.uid)
                                                ? tagsBlack
                                                : tagsGray
                                        }
                                    />
                                ) : (
                                    <img src={tagsGray} />
                                )}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default HomePageContent;

import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import userPhoto from "../img/user.png";
// markdown
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNightBlue } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import likeGray from "../img/like-gray.png";
import likeBlack from "../img/like-black.png";
import messages from "../img/messages.png";
import tagsGray from "../img/price-tag-gray.png";
import tagsBlack from "../img/price-tag-black.png";

import {
    getArticle,
    addTrackUserId,
    reTrackUserId,
    addLikeUserId,
    reLikeUserId,
} from "../hooks/useFireStore";
import { auth } from "../lib/firebase/initialize";

import { AppContext } from "../Layout";

const Article = () => {
    const { id } = useParams();
    const [writeData, setWriteData] = useState({
        author: {},
    });
    const { user } = useContext(AppContext);
    useEffect(() => {
        getArticle(id, setWriteData);
    }, []);
    const navigate = useNavigate();
    const toggleImageTrackHandler = (e) => {
        if (user == null) {
            navigate("/signIn");
            return;
        }
        if (isStore) {
            reTrackUserId(id, user.uid);
        } else {
            addTrackUserId(id, user.uid);
        }
    };
    const toggleImageLikeHandler = (e) => {
        if (user == null) {
            navigate("/signIn");
            return;
        }
        if (isLike) {
            reLikeUserId(id, user.uid);
        } else {
            addLikeUserId(id, user.uid);
        }
    };
    const isStore = writeData.trackUserId?.includes(auth.currentUser?.uid);
    const isLike = writeData.likeUserId?.includes(auth.currentUser?.uid);
    return (
        <div className="article">
            <div className="article-content">
                <div className="article-author">
                    <div>
                        {writeData.author.photoURL ? (
                            <img
                                className="article-author-photo"
                                src={writeData.author.photoURL}
                            />
                        ) : (
                            <img
                                // className="article-author-photo"
                                src={userPhoto}
                            />
                        )}
                    </div>
                    <div>{writeData.topic}</div>
                    <div>{writeData.author.displayName || "匿名"}</div>
                    <div>
                        {writeData.time?.toDate().toLocaleDateString("zh-TW")}
                    </div>
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
                    <div className="article-feel-like">
                        <img
                            src={isLike ? likeBlack : likeGray}
                            onClick={toggleImageLikeHandler}
                        />
                        <div>{writeData.likeUserId?.length || 0}</div>
                    </div>
                    <div className="article-feel-messages">
                        <img src={messages} />
                    </div>
                    <div className="article-feel-tags">
                        <img
                            src={isStore ? tagsBlack : tagsGray}
                            onClick={toggleImageTrackHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;

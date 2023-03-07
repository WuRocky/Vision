import React, { useContext, useCallback, useState } from "react";
import { AppContext } from "../../Layout";
import { useNavigate, Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import userPhoto from "../../img/user.png";
import likeGray from "../../img/like-gray.png";
import likeBlack from "../../img/like-black.png";
import message from "../../img/messages.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import { auth } from "../../lib/firebase/initialize";
import Comments from "../message/Comments";
import {
    addTrackUserId,
    reTrackUserId,
    addLikeUserId,
    reLikeUserId,
} from "../../hooks/useFireStore";

import noImage from "../../img/no-Image.png";

const HomePageContent = () => {
    const { firebaseTwoDoc, user } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);
    const [showComment, setShowComment] = useState(null);
    return (
        <div className="homepage-content">
            {firebaseTwoDoc.map((data, index) => {
                const isStore = data.trackUserId?.includes(
                    auth.currentUser?.uid
                );
                const isLike = data.likeUserId?.includes(auth.currentUser?.uid);
                const toggleImageLikeHandler = (e) => {
                    if (user == null) {
                        navigate("/signIn");
                        return;
                    }
                    if (isLike) {
                        reLikeUserId(data.id, user.uid);
                    } else {
                        addLikeUserId(data.id, user.uid);
                    }
                };
                const commentHandler = (e) => {
                    e.preventDefault();
                    if (user == null) {
                        navigate("/signIn");
                        return;
                    }
                    handleClick(data.id);
                };
                const toggleImageTrackHandler = (e) => {
                    if (user == null) {
                        navigate("/signIn");
                        return;
                    }
                    if (isStore) {
                        reTrackUserId(data.id, user.uid);
                    } else {
                        addTrackUserId(data.id, user.uid);
                    }
                };
                return (
                    <div
                        key={data.id}
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
                            <div>{data.author.displayName || "匿名"}</div>
                            <div>{data.topic}</div>
                        </div>
                        <div
                            className="homepage-content-item-2"
                            onClick={() => handleClick(data.id)}
                            to={`/article/${data.id}`}
                        >
                            <div className="homepage-content-item-2-title">
                                {data.title}
                            </div>
                            <div className="homepage-content-item-2-article">
                                {/* {data.content} */}

                                <ReactMarkdown
                                    children={data.content}
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h1: "h4",
                                        h2: "h5",
                                        h3: "h6",
                                        img: "span",
                                    }}
                                />
                            </div>
                            <img
                                className="homepage-content-item-2-img"
                                src={data.imageUrl || noImage}
                            />
                        </div>
                        <div className="homepage-content-item-3">
                            <div className="homepage-content-item-3-like">
                                <img
                                    src={isLike ? likeBlack : likeGray}
                                    onClick={toggleImageLikeHandler}
                                />
                                <div>{data.likeUserId?.length || 0}</div>
                            </div>
                            <div className="homepage-content-item-3-message">
                                <img src={message} onClick={commentHandler} />
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
                                        onClick={toggleImageTrackHandler}
                                    />
                                ) : (
                                    <img
                                        src={isStore ? tagsBlack : tagsGray}
                                        onClick={toggleImageTrackHandler}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HomePageContent;

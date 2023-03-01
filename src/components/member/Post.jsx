import React, { useState, useContext, useCallback } from "react";
import { AppContext } from "../../Layout";

import userPhoto from "../../img/user.png";

import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import edit from "../../img/edit.png";
import remove from "../../img/delete.png";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { useNavigate, Link } from "react-router-dom";

const Post = ({ setPoint, setMyDoctId }) => {
    const { myArticles, user } = useContext(AppContext);
    const navigate = useNavigate();
    const articleHandleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    const upDataHandleClick = useCallback((id) => {
        navigate(`/update-article/${id}`);
    }, []);
    return (
        <div className="post">
            <div className="post-container">
                {myArticles.map((data, index) => {
                    if (data.author.uid == user.uid) {
                        return (
                            <div className="post-container-main" key={index}>
                                <div
                                    key={data.id}
                                    onClick={() => articleHandleClick(data.id)}
                                    to={`/article/${data.id}`}
                                    className={`post-content-item ${
                                        index > 0 ? "borderTop" : ""
                                    }`}
                                >
                                    <div className="post-content-item-1">
                                        <div>
                                            {data.author.photoURL ? (
                                                <img
                                                    className="post-content-item-1-userPhoto"
                                                    src={data.author.photoURL}
                                                />
                                            ) : (
                                                <img src={userPhoto} />
                                            )}
                                        </div>
                                        <div>{data.topic}</div>
                                        <div>
                                            {data.author.displayName || "匿名"}
                                        </div>
                                    </div>
                                    <div className="post-content-item-2">
                                        <div className="post-content-item-2-title">
                                            {data.title}
                                        </div>
                                        <div className="post-content-item-2-article">
                                            {data.content}

                                            <ReactMarkdown
                                                children={data.content}
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    h1: "h4",
                                                    h2: "h5",
                                                    h3: "h6",
                                                }}
                                            />
                                        </div>
                                        <img
                                            className="post-content-item-2-img"
                                            src={
                                                data.imageUrl ||
                                                "https://react.semantic-ui.com/images/wireframe/image.png"
                                            }
                                        />
                                    </div>
                                    <div className="post-content-item-3">
                                        <div className="post-content-item-3-like">
                                            <img src={likeGray} />
                                            <div>
                                                {data.likeUserId?.length || 0}
                                            </div>
                                        </div>
                                        <div className="post-content-item-3-like">
                                            {user ? (
                                                <img
                                                    src={
                                                        data.trackUserId
                                                            ?.length &&
                                                        data.trackUserId.includes(
                                                            user?.uid
                                                        )
                                                            ? tagsBlack
                                                            : tagsGray
                                                    }
                                                />
                                            ) : (
                                                <img src={tagsGray} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="post-container-fix">
                                    <div
                                        onClick={() =>
                                            upDataHandleClick(data.id)
                                        }
                                        className="post-container-fix-edit"
                                    >
                                        <img src={edit} />
                                    </div>
                                    <div
                                        onClick={() => {
                                            setPoint(data.title);
                                            setMyDoctId(data.id);
                                        }}
                                        className="post-container-fix-remove"
                                    >
                                        <img src={remove} />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Post;

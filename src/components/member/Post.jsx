import React, { useContext, useCallback } from "react";
import { AppContext } from "../../Layout";

import userPhoto from "../../img/user.png";

import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import { useNavigate, Link } from "react-router-dom";

const Post = () => {
    const { myArticles, user } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    return (
        <div className="post">
            <div className="post-container">
                {myArticles.map((data, index) => {
                    if (data.author.uid == user.uid) {
                        return (
                            <Link
                                key={data.id}
                                onClick={() => handleClick(data.id)}
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
                                    <p className="post-content-item-2-article">
                                        {data.content}
                                    </p>
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
                                        <img
                                            src={
                                                data.trackUserId?.length
                                                    ? tagsBlack
                                                    : tagsGray
                                            }
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Post;

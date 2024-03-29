import React, { useContext, useCallback, useState } from "react";
import { AppContext } from "../../Layout";

import userPhoto from "../../img/user.png";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import noImage from "../../img/no-Image.png";

import message from "../../img/messages.png";

import { useNavigate, Link } from "react-router-dom";

const Track = () => {
    const { myArticles, user } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    const [firstIndex, setFirstIndex] = useState(-1);
    const firstMatchIndex = myArticles.findIndex(
        (data) => data.trackUserId == user.uid
    );
    const uid = user.uid;
    // console.log(firstMatchIndex);
    return (
        <div className="track">
            <div className="track-container">
                {myArticles.map((data, index) => {
                    if (data.trackUserId && data.trackUserId.includes(uid)) {
                        if (firstIndex === -1 || index < firstIndex) {
                            setFirstIndex(index);
                        }
                        return (
                            <div
                                key={data.id}
                                onClick={() => handleClick(data.id)}
                                to={`/article/${data.id}`}
                                className={`track-content-item ${
                                    // index === firstMatchIndex ? "" : "borderTop"
                                    index === firstIndex ? "" : "borderTop"
                                }`}
                            >
                                <div className="track-content-item-1">
                                    <div>
                                        {data.author.photoURL ? (
                                            <img
                                                className="track-content-item-1-userPhoto"
                                                src={data.author.photoURL}
                                            />
                                        ) : (
                                            <img src={userPhoto} />
                                        )}
                                    </div>
                                    <div>
                                        {data.author.displayName
                                            ? data.author.displayName
                                            : "匿名"}
                                    </div>
                                    <div>{data.topic}</div>
                                </div>
                                <div className="track-content-item-2">
                                    <div className="track-content-item-2-title">
                                        {data.title}
                                    </div>
                                    <div className="track-content-item-2-article">
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
                                        className="track-content-item-2-img"
                                        src={data.imageUrl || noImage}
                                    />
                                </div>
                                <div className="track-content-item-3">
                                    <div className="track-content-item-3-like">
                                        <img src={likeGray} />
                                        <div>
                                            {data.likeUserId?.length || 0}
                                        </div>
                                    </div>
                                    <div className="track-content-item-3-message">
                                        <img src={message} />
                                        <div>
                                            {data.commentsContent
                                                ? data.commentsContent
                                                : 0}
                                        </div>
                                    </div>
                                    <div className="track-content-item-3-like">
                                        {user ? (
                                            <img
                                                src={
                                                    data.trackUserId?.length &&
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
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Track;

import React, { useContext, useCallback } from "react";
import { AppContext } from "../../Layout";

import userPhoto from "../../img/user.png";

import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

import Menu from "./Menu";

import { useNavigate, Link } from "react-router-dom";

const Track = () => {
    const { firebaseData, user } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);
    return (
        <div className="track">
            <div className="track-container">
                <Menu />
                <div className="track-title">我的收藏</div>
                <div className="track-content">
                    {firebaseData.map((data) => {
                        if (data.trackUserId == user.uid) {
                            return (
                                <Link
                                    key={data.id}
                                    onClick={() => handleClick(data.id)}
                                    to={`/article/${data.id}`}
                                    className="track-content-item"
                                >
                                    <div className="track-content-item-1">
                                        <div>
                                            {data.author.photoURL ? (
                                                <img src="data.author.photoURL" />
                                            ) : (
                                                <img src={userPhoto} />
                                            )}
                                        </div>
                                        <div>{data.topic}</div>
                                        <div>
                                            {data.author.displayName || "匿名"}
                                        </div>
                                    </div>
                                    <div className="track-content-item-2">
                                        <div className="track-content-item-2-title">
                                            {data.title}
                                        </div>
                                        <p className="track-content-item-2-article">
                                            {data.content}
                                        </p>
                                        <img
                                            className="track-content-item-2-img"
                                            src={
                                                data.imageUrl ||
                                                "https://react.semantic-ui.com/images/wireframe/image.png"
                                            }
                                        />
                                    </div>
                                    <div className="track-content-item-3">
                                        <div className="track-content-item-3-like">
                                            <img src={likeGray} />
                                            <div>
                                                {data.likeUserId?.length || 0}
                                            </div>
                                        </div>
                                        <div className="track-content-item-3-like">
                                            <img
                                                src={
                                                    data.trackUserId
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
        </div>
    );
};

export default Track;

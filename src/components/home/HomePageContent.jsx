import React, { useContext, useCallback, useEffect, useState } from "react";
import userPhoto from "../../img/user.png";
import { AppContext } from "../../Layout";
import { useNavigate, Link } from "react-router-dom";

import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";

const HomePageContent = () => {
    const { firebaseData } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    return (
        <div className="homepage-content">
            {firebaseData.map((data) => {
                return (
                    <Link
                        key={data.id}
                        onClick={() => handleClick(data.id)}
                        to={`/article/${data.id}`}
                        className="homepage-content-item"
                    >
                        <div className="homepage-content-item-1">
                            <div>
                                {data.author.photoURL ? (
                                    <img src="data.author.photoURL" />
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
                                {data.content}
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
                            <div className="homepage-content-item-3-like">
                                <img
                                    src={
                                        data.trackUserId ? tagsBlack : tagsGray
                                    }
                                />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default HomePageContent;

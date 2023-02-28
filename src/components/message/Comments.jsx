import React, { useState, useContext, useEffect } from "react";
import { addMessage, getArticleMessage } from "../../hooks/useFireStore";
import { useParams } from "react-router-dom";
import { AppContext } from "../../Layout";
import Message from "./Message";
const Comments = ({ showComment, setShowComment }) => {
    const { id } = useParams();
    const { user } = useContext(AppContext);
    const [commentContent, setCommentContent] = useState("");
    const closeHandler = (e) => {
        setShowComment();
    };
    const [getMessage, setGetMessage] = useState([]);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        getArticleMessage(id, setGetMessage);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const storeId = id;
        const uid = user.uid;
        const displayName = user.displayName;
        const photoURL = user.photoURL;
        if (commentContent === "") {
            setMessage("請輸入內容");
        }

        addMessage(
            commentContent,
            storeId,
            uid,
            displayName,
            photoURL,
            setMessage
        );
        setCommentContent("");
    };

    return (
        <div>
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            {showComment && (
                <div className="comments">
                    <div className="comments-div">
                        <div className="comments-bar"></div>
                        <div className="comments-content">
                            <div className="comments-content-item-1">
                                <div className="comments-content-item-1-title">
                                    共 {getMessage?.length || 0} 則留言
                                </div>
                                {getMessage.length ? (
                                    <div className="comments-content-item-1-title-content">
                                        {getMessage.map((data, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="comments-content-item-1-content"
                                                >
                                                    <div className="comments-content-item-1-content-title">
                                                        <div className="item-1-content-title-img">
                                                            <img
                                                                src={
                                                                    data.author
                                                                        .photoURL
                                                                        ? data
                                                                              .author
                                                                              .photoURL
                                                                        : "https://react.semantic-ui.com/images/wireframe/image.png"
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            {data.author
                                                                .displayName
                                                                ? data.author
                                                                      .displayName
                                                                : "匿名"}
                                                        </div>
                                                        {data.createdAt && (
                                                            <div className="comments-content-item-1-content-title-time">
                                                                {data.createdAt
                                                                    .toDate()
                                                                    .toLocaleDateString(
                                                                        "zh-TW"
                                                                    )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="comments-content-item-1-content-message">
                                                        {data.content}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <form>
                                <textarea
                                    value={commentContent}
                                    onChange={(e) => {
                                        setCommentContent(e.target.value);
                                    }}
                                />
                                <div className="comments-content-item-2">
                                    <div
                                        onClick={onSubmit}
                                        className="comments-content-item-2-message"
                                    >
                                        留言
                                    </div>
                                    <div
                                        onClick={() => closeHandler()}
                                        className="comments-content-item-2-close"
                                    >
                                        取消
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comments;

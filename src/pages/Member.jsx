import React, { useState } from "react";

import Setting from "../components/member/Setting";
import Post from "../components/member/Post";
import Track from "../components/member/Track";

import Point from "../components/message/Point";
import Message from "../components/message/Message";
const Member = () => {
    const [message, setMessage] = useState(null);

    const [point, setPoint] = useState(null);
    const [myDoctId, setMyDoctId] = useState("");
    const pointHandler = (e) => {
        e.preventDefault();
    };
    const [showComponent, setShowComponent] = useState("A");
    return (
        <div className="member">
            <div onClick={() => setMessage()}>
                <Message className="member-message" message={message} />
            </div>
            <div onClick={pointHandler}>
                <Point
                    point={point}
                    setPoint={setPoint}
                    setMessage={setMessage}
                    myDoctId={myDoctId}
                />
            </div>
            <div className="member-item">
                <div className="member-container">
                    <div className="member-title">會員資料</div>
                    <div className="member-content">
                        <Setting setMessage={setMessage} />
                        <div>
                            <div className="member-content-change-components">
                                <div
                                    style={{
                                        color:
                                            showComponent === "A"
                                                ? "black"
                                                : "gray",
                                    }}
                                    onClick={() => setShowComponent("A")}
                                >
                                    我的文章
                                </div>
                                <div
                                    style={{
                                        color:
                                            showComponent === "B"
                                                ? "black"
                                                : "gray",
                                    }}
                                    onClick={() => setShowComponent("B")}
                                >
                                    我的收藏
                                </div>
                            </div>
                            {showComponent === "A" ? (
                                <Post
                                    setPoint={setPoint}
                                    setMyDoctId={setMyDoctId}
                                    setMessage={setMessage}
                                />
                            ) : (
                                <Track />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Member;

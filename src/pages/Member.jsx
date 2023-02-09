import React, { useState } from "react";
import Menu from "../components/member/Menu";
import Setting from "../components/member/Setting";

// import Message from "../Message";
import Message from "../components/Message";
const Member = () => {
    const [message, setMessage] = useState(null);
    return (
        <div className="member">
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <div className="member-container">
                <Menu />
                <div className="member-title">會員資料</div>
                <div className="member-content">
                    <Setting setMessage={setMessage} />
                </div>
            </div>
        </div>
    );
};

export default Member;

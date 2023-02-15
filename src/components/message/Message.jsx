import React from "react";

const Message = ({ message }) => {
    return (
        <div>
            {message && (
                <div className="message">
                    <div className="message-div">
                        <div className="decorator-bar"></div>
                        <div className="message-content">{message}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Message;

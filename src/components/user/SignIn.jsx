import React, { useState } from "react";

import Register from "./Register";
import LoginUser from "./LoginUser.jsx";

import Message from "../Message";

const SignIn = () => {
    const [message, setMessage] = useState(null);

    return (
        <div>
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <div className="signInMain">
                <div className="signInContainer">
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <Register setMessage={setMessage} />

                    <LoginUser setMessage={setMessage} />
                </div>
            </div>
        </div>
    );
};

export default SignIn;

import React, { useState } from "react";

import Register from "./Register";
import LoginUser from "./LoginUser.jsx";

import Message from "../message/Message";

import {
    logInGoogle,
    logInfacebook,
    logInGitHub,
} from "../../hooks/useFireAuthentication";
import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import github from "../../img/github.png";
const SignIn = () => {
    const [message, setMessage] = useState(null);

    const registerGoogleHandler = (e) => {
        e.preventDefault();
        logInGoogle(setMessage);
    };

    const registerFacebookHandler = (e) => {
        e.preventDefault();
        logInfacebook(setMessage);
    };

    const registerGitHubHandler = (e) => {
        e.preventDefault();
        logInGitHub(setMessage);
    };

    return (
        <div>
            <div onClick={() => setMessage()}>
                <Message message={message} />
            </div>
            <div className="signInMain">
                <div className="signInContainer">
                    <div className="other-register">
                        <div onClick={registerGoogleHandler} className="google">
                            <img src={google} />
                        </div>
                        <div
                            onClick={registerFacebookHandler}
                            className="facebook"
                        >
                            <img src={facebook} />
                        </div>
                        <div onClick={registerGitHubHandler} className="github">
                            <img src={github} />
                        </div>
                    </div>
                    <input type="checkbox" id="chk" aria-hidden="true" />

                    <Register setMessage={setMessage} />

                    <LoginUser setMessage={setMessage} />
                </div>
            </div>
        </div>
    );
};

export default SignIn;

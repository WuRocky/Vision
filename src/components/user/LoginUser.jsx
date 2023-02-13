import React, { useState } from "react";

import { signInUser } from "../../hooks/useFireAuthentication";
const LoginUser = ({ setMessage }) => {
    const [loginError, setLoginError] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPasswrod, setLoginPassword] = useState("");

    const loginEmailHandler = (e) => {
        setLoginEmail(e.target.value);
    };

    const loginPasswrodHandler = (e) => {
        setLoginPassword(e.target.value);
    };

    const loginButtonHandler = (e) => {
        e.preventDefault();

        if (loginEmail === "" || loginPasswrod === "") {
            setMessage("請輸入信箱和密碼");
            return;
        }

        signInUser(loginEmail, loginPasswrod, setMessage, setLoginError);
        setLoginEmail("");
        setLoginPassword("");
    };

    return (
        <div className="login">
            <form>
                <label
                    htmlFor="chk"
                    aria-hidden="true"
                    onClick={() => {
                        setLoginError("");
                    }}
                >
                    Sign In
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    onChange={loginEmailHandler}
                    value={loginEmail}
                />
                <input
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                    onChange={loginPasswrodHandler}
                    value={loginPasswrod}
                />
                <button onClick={loginButtonHandler}>Login</button>
                <div className="signInMessage">{loginError}</div>
            </form>
        </div>
    );
};

export default LoginUser;

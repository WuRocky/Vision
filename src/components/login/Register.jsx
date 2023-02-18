import React, { useState } from "react";

import { createUser } from "../../hooks/useFireAuthentication";
import { useNavigate } from "react-router-dom";
const Register = ({ setMessage }) => {
    const [registerError, setRegisterError] = useState("");

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPasswrod, setRegisterPassword] = useState("");

    const registerEmailHandler = (e) => {
        setRegisterEmail(e.target.value);
    };

    const registerPasswordHandler = (e) => {
        setRegisterPassword(e.target.value);
    };

    const registerButtonHandler = (e) => {
        e.preventDefault();

        if (registerEmail === "" || registerPasswrod === "") {
            setMessage("請輸入姓名、信箱和密碼");
            return;
        }
        createUser(
            registerEmail,
            registerPasswrod,
            setMessage,
            setRegisterError
        );
        setRegisterEmail("");
        setRegisterPassword("");
    };

    return (
        <div className="register">
            <form>
                <label
                    htmlFor="chk"
                    aria-hidden="true"
                    onClick={() => {
                        setRegisterError("");
                    }}
                >
                    Register
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required=""
                    onChange={registerEmailHandler}
                    value={registerEmail}
                />
                <input
                    type="password"
                    name="pswd"
                    placeholder="Password"
                    required=""
                    onChange={registerPasswordHandler}
                    value={registerPasswrod}
                />
                <button
                    className="register-button"
                    onClick={registerButtonHandler}
                >
                    Sign up
                </button>
                <div className="signInMessage">{registerError}</div>
            </form>
        </div>
    );
};

export default Register;

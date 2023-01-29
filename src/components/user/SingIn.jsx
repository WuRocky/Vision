import React, { useState } from "react";

import { auth } from "../../lib/firebase/initialize";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

import Message from "../Message";

const SingIn = () => {
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [error, setError] = useState(null);
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
            setMessage("請輸入信箱和密碼");
            setShowMessage(true);
            return;
        }
        createUserWithEmailAndPassword(auth, registerEmail, registerPasswrod)
            .then((userCredential) => {
                setMessage("註冊成功");
                setShowMessage(true);
                // const user = userCredential.user;
                // console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === "auth/invalid-email") {
                    setError("電子信箱無效");
                } else if (
                    errorMessage ===
                    "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ) {
                    setError("密碼應至少為 6 個字符");
                } else if (errorCode === "auth/email-already-in-use") {
                    setError("電子信箱已有註冊");
                }
            });
        setRegisterEmail("");
        setRegisterPassword("");
    };

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
            setShowMessage(true);
            return;
        }
        signInWithEmailAndPassword(auth, loginEmail, loginPasswrod)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                if (errorCode === "auth/invalid-email") {
                    setError("電子信箱無效");
                } else if (errorCode === "auth/wrong-password") {
                    setError("密碼錯誤");
                }
            });

        setLoginEmail("");
        setLoginPassword("");
    };

    return (
        <div>
            <div onClick={() => setShowMessage(false)}>
                {showMessage && (
                    <Message
                        message={message}
                        setShowMessage={setShowMessage}
                    />
                )}
            </div>
            <div className="singInMain">
                <div className="singInContainer">
                    <input type="checkbox" id="chk" aria-hidden="true" />
                    <div className="register">
                        <form>
                            <label htmlFor="chk" aria-hidden="true">
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
                            <button onClick={registerButtonHandler}>
                                Sign up
                            </button>
                            <div className="singInMessage">{error}</div>
                        </form>
                    </div>

                    <div className="login">
                        <form>
                            <label htmlFor="chk" aria-hidden="true">
                                Login
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
                            <div className="singInMessage">{error}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingIn;

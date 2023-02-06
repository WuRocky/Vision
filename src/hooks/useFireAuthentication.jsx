import { auth } from "../lib/firebase/initialize";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    signOut,
} from "firebase/auth";

const createUser = async (email, password, setMessage, setRegisterError) => {
    try {
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        setMessage("註冊成功");
        return response;
    } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
            case "auth/invalid-email":
                setRegisterError("電子信箱格式不正確");
                break;
            case "Firebase: Password should be at least 6 characters (auth/weak-password).":
                setRegisterError("密碼應至少為 6 個字符");
                break;
            case "auth/email-already-in-use":
                setRegisterError("電子信箱已有存在");
                break;
        }

        return false;
    }
};

const signInUser = async (email, password, setMessage, setLoginError) => {
    try {
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        setMessage("登入成功");
        return response;
    } catch (error) {
        const errorCode = error.code;

        switch (errorCode) {
            case "auth/invalid-email":
                setLoginError("電子信箱無效");
                break;
            case "auth/wrong-password":
                setLoginError("密碼錯誤");
                break;
            case "auth/user-not-found":
                setLoginError("尚未註冊");
                break;
        }

        return false;
    }
};

const getUser = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
};

const userSignOut = () => {
    signOut(auth);
};

export { createUser, signInUser, getUser, userSignOut };

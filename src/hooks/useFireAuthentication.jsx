import { auth } from "../lib/firebase/initialize";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    updateEmail,
    reauthenticateWithCredential,
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

const updataUserEmail = (email, setMessage) => {
    updateEmail(auth.currentUser, email)
        .then(() => {
            setMessage("更新信箱成功");
            console.log("更新信箱成功");
        })
        .catch((error) => {
            // console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setMessage("更新信箱失敗 :" + errorMessage);
        });
};

const updataUserPhoto = (photo, setMessage) => {
    updateProfile(auth.currentUser, {
        photoURL: photo,
    })
        .then(() => {
            setMessage("更新照片成功");
        })
        .catch((error) => {
            setMessage("更新照片失敗 :", error);
        });
};

const updataUserName = (name, setMessage) => {
    updateProfile(auth.currentUser, {
        displayName: name,
    })
        .then(() => {
            setMessage("更新姓名成功");
        })
        .catch((error) => {
            setMessage("更新姓名失敗 :", error);
        });
};

export {
    createUser,
    signInUser,
    getUser,
    userSignOut,
    updataUserEmail,
    updataUserName,
    updataUserPhoto,
};

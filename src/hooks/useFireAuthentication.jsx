import { auth } from "../lib/firebase/initialize";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
    signOut,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
} from "firebase/auth";

///* 註冊帳號 *///
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
///* 登入帳號 *///
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

///* 得到用戶資訊 *///
const getUser = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        setUser(user);
    });
};

///* 登出帳號 *///
const userSignOut = () => {
    signOut(auth);
};

///* 更新信箱 *///
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

///* 更信照片 *///
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

///* 更新姓名 *///
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

///* 更新密碼 *///
const updataUserPassword = (email, oldPassword, newPassword, setMessage) => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, oldPassword);

    reauthenticateWithCredential(user, credential)
        .then(() => {
            updatePassword(user, newPassword).then(() => {
                setMessage("更新密碼成功");
            });
        })
        .catch((error) => {
            console.log(error);
            setMessage("更新密碼失敗");
        });
};

///* 沒有登入 *///
const monitorUser = (setUser) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUser(user);
            // console.log(uid);
        } else {
            // console.log("還沒登入");
        }
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
    updataUserPassword,
    monitorUser,
};

import { auth } from "../lib/firebase/initialize";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
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
    signInWithPopup,
} from "firebase/auth";

///* 註冊帳號 *///
const createUser = (email, password, setMessage, setRegisterError) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setMessage("註冊成功");
        })
        .catch((error) => {
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
        });
};
///* 登入帳號 *///
const signInUser = (email, password, setMessage, setLoginError) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setMessage("登入成功");
        })
        .catch((error) => {
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
        });
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

            setTimeout(() => {
                setUser(user);
                // window.location.href = "/";
            }, 2000);
            // console.log(uid);
        } else {
            // console.log("還沒登入");
        }
    });
};

///* google 登入 *///
const logInGoogle = (setMessage) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            setMessage("登入成功");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GoogleAuthProvider.credentialFromError(error);
            setMessage(errorMessage);
        });
};

///* facebook 登入 *///
const logInfacebook = (setMessage) => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            setMessage("登入成功");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);
            setMessage(errorMessage);
        });
};

///* github 登入 *///
const logInGitHub = (setMessage) => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const user = result.user;
            setMessage("登入成功");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData.email;

            const credential = GithubAuthProvider.credentialFromError(error);
            setMessage(errorMessage);
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
    logInGoogle,
    logInfacebook,
    logInGitHub,
};

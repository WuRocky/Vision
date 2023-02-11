import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../Layout";
import {
    updataUserName,
    updataUserPassword,
} from "../../hooks/useFireAuthentication";

import { updateArticleUserName } from "../../hooks/useFireStore";

import { addUserPhoto } from "../../hooks/useFireStorage";

import pencil from "../../img/pencil.png";

// function Email({ setMessage }) {
//     const { user } = useContext(AppContext);
//     const email = user.email;
//     const [editingEmail, setEditingEmail] = useState(false);
//     const [emailValue, setEmailValue] = useState("");

//     const emailValueHandler = (e) => {
//         setEmailValue(e.target.value);
//     };
//     const emailEditHandler = (e) => {
//         e.preventDefault();
//         setEditingEmail(true);
//     };
//     const emailSaveHandler = (e) => {
//         e.preventDefault();
//         updataUserEmail(emailValue, setMessage);
//         setEditingEmail(false);
//     };

//     const emailCancelHandler = (e) => {
//         e.preventDefault();
//         setEditingEmail(false);
//     };
//     return (
//         <div className="setting-other-email">
//             <div>會員信箱</div>
//             {editingEmail ? (
//                 <input
//                     type="text"
//                     onChange={emailValueHandler}
//                     placeholder="輸入新的信箱"
//                 />
//             ) : (
//                 <div>{email}</div>
//             )}
//             {editingEmail ? (
//                 <div className="setting-other-email-change">
//                     <button onClick={emailSaveHandler}>儲存</button>
//                     <button onClick={emailCancelHandler}>取消</button>
//                 </div>
//             ) : (
//                 <button onClick={emailEditHandler}>修改</button>
//             )}
//         </div>
//     );
// }

function Name({ setMessage }) {
    const { user, firebaseData } = useContext(AppContext);
    const name = user.displayName;
    const [nameValue, setNameValue] = useState("");
    const userId = user.uid;

    const [editingName, seteditingName] = useState(false);

    const nameValueHandler = (e) => {
        setNameValue(e.target.value);
    };
    const nameEditHandler = (e) => {
        e.preventDefault();
        seteditingName(true);
    };
    const nameSaveHandler = (e) => {
        e.preventDefault();
        updataUserName(nameValue, setMessage);
        updateArticleUserName(userId, nameValue);
        seteditingName(false);
    };

    const nameCancelHandler = (e) => {
        e.preventDefault();

        seteditingName(false);
    };

    return (
        <div className="setting-other-name">
            <div className="setting-other-name-title">會員名稱</div>
            {editingName ? (
                <div className="setting-other-name-change-input">
                    <input
                        type="text"
                        onChange={nameValueHandler}
                        placeholder="輸入新的姓名"
                    />
                </div>
            ) : (
                <div className="setting-other-name-input">{name}</div>
            )}
            {editingName ? (
                <div className="setting-other-name-change-button">
                    <button onClick={nameSaveHandler}>儲存</button>
                    <button onClick={nameCancelHandler}>取消</button>
                </div>
            ) : (
                <button
                    className="setting-other-name-button"
                    onClick={nameEditHandler}
                >
                    修改
                </button>
            )}
        </div>
    );
}

function Password({ setMessage }) {
    const { user } = useContext(AppContext);
    const email = user.email;
    const [editingPassword, setEditingPassword] = useState(false);

    const [oldPasswird, setOldePasswird] = useState("");
    const [newPasswird, setNewPasswird] = useState("");

    const oldPasswirdHandler = (e) => {
        setOldePasswird(e.target.value);
    };

    const newPasswirdHandler = (e) => {
        setNewPasswird(e.target.value);
    };

    const passwordEditHandler = (e) => {
        e.preventDefault();
        setEditingPassword(true);
    };
    const PasswordSaveHandler = (e) => {
        e.preventDefault();
        updataUserPassword(email, oldPasswird, newPasswird, setMessage);
        setEditingPassword(false);
    };

    const PasswordCancelHandler = (e) => {
        e.preventDefault();
        setEditingPassword(false);
    };
    return (
        <div className="setting-other-password">
            <div className="setting-other-password-title">會員密碼</div>
            {editingPassword ? (
                <div className="setting-other-password-change-input">
                    <input
                        onChange={oldPasswirdHandler}
                        type="text"
                        placeholder="輸入目前的密碼"
                    />
                    <input
                        onChange={newPasswirdHandler}
                        type="text"
                        placeholder="輸入新的密碼"
                    />
                </div>
            ) : (
                <div className="setting-other-password-input">*******</div>
            )}
            {editingPassword ? (
                <div className="setting-other-password-change-button">
                    <button onClick={PasswordSaveHandler}>儲存</button>
                    <button onClick={PasswordCancelHandler}>取消</button>
                </div>
            ) : (
                <button
                    className="setting-other-password-button"
                    onClick={passwordEditHandler}
                >
                    修改
                </button>
            )}
        </div>
    );
}

function Image({ setMessage }) {
    const { user } = useContext(AppContext);
    const [file, seFile] = useState(null);
    const previewUrl = file
        ? URL.createObjectURL(file)
        : user.photoURL ||
          "https://react.semantic-ui.com/images/wireframe/image.png";
    const imageEditHandler = (e) => {
        e.preventDefault();
        fileInput.current.click();
    };

    const imageSaveHandler = (e) => {
        e.preventDefault();

        const uid = user.uid;
        const fileType = file.type;
        addUserPhoto(uid, file, fileType, setMessage);
    };

    const fileInput = useRef(null);
    return (
        <div className="setting-img-content">
            <input
                id="file"
                ref={fileInput}
                type="file"
                onChange={(e) => {
                    seFile(e.target.files[0]);
                }}
            />

            <img className="userPhoto" src={previewUrl} />

            <button
                htmlFor="file"
                onClick={imageEditHandler}
                className="setting-img-button"
            >
                <img className="setting-img-button-content" src={pencil} />
            </button>
            <button className="setting-find" onClick={imageSaveHandler}>
                修改
            </button>
        </div>
    );
}

function Setting({ setMessage }) {
    return (
        <div className="setting">
            <div className="setting-img">
                <Image setMessage={setMessage} />
            </div>
            <div className="setting-other">
                <Name setMessage={setMessage} />
                {/* <Email setMessage={setMessage} /> */}
                <Password setMessage={setMessage} />
            </div>
        </div>
    );
}

export default Setting;

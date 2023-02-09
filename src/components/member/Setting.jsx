import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../Layout";
import {
    updataUserEmail,
    updataUserName,
    updataUserPhoto,
} from "../../hooks/useFireAuthentication";

import { addUserPhoto } from "../../hooks/useFireStorage";

import pencil from "../../img/pencil.png";

function Name({ setMessage }) {
    const { user } = useContext(AppContext);
    const name = user.displayName;
    const [nameValue, setNameValue] = useState("");

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
        seteditingName(false);
    };
    return (
        <div className="setting-other-name">
            <div>會員名稱</div>
            {editingName ? (
                <input
                    type="text"
                    onChange={nameValueHandler}
                    placeholder="輸入新的姓名"
                />
            ) : (
                <div>{name}</div>
            )}
            {editingName ? (
                <button onClick={nameSaveHandler}>儲存</button>
            ) : (
                <button onClick={nameEditHandler}>修改</button>
            )}
        </div>
    );
}

function Email({ setMessage }) {
    const { user } = useContext(AppContext);
    const email = user.email;
    const [editingEmail, setEditingEmail] = useState(false);
    const [emailValue, setEmailValue] = useState("");

    const emailValueHandler = (e) => {
        setEmailValue(e.target.value);
    };
    const emailEditHandler = (e) => {
        e.preventDefault();
        setEditingEmail(true);
    };
    const emailSaveHandler = (e) => {
        e.preventDefault();

        updataUserEmail(emailValue, setMessage);
        setEditingEmail(false);
    };
    return (
        <div className="setting-other-email">
            <div>會員信箱</div>
            {editingEmail ? (
                <input
                    type="text"
                    onChange={emailValueHandler}
                    placeholder="輸入新的信箱"
                />
            ) : (
                <div>{email}</div>
            )}
            {editingEmail ? (
                <button onClick={emailSaveHandler}>儲存</button>
            ) : (
                <button onClick={emailEditHandler}>修改</button>
            )}
        </div>
    );
}

function Password() {
    const { user } = useContext(AppContext);
    // const password = user.password;

    const [editingPassword, setEditingPassword] = useState(false);
    const passwordEditHandler = (e) => {
        e.preventDefault();
        setEditingPassword(true);
    };
    const PasswordSaveHandler = (e) => {
        e.preventDefault();
        setEditingPassword(false);
    };

    return (
        <div className="setting-other-password">
            <div>會員密碼</div>
            {editingPassword ? (
                <input type="text" placeholder="輸入新的信箱" />
            ) : (
                <div>*******</div>
            )}
            {editingPassword ? (
                <button onClick={PasswordSaveHandler}>儲存</button>
            ) : (
                <button onClick={passwordEditHandler}>修改</button>
            )}
        </div>
    );
}

function Image({ setMessage }) {
    const { user } = useContext(AppContext);
    const [file, seFile] = useState(null);
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
    const previeUrl = file
        ? URL.createObjectURL(file)
        : "https://react.semantic-ui.com/images/wireframe/image.png";
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

            <img className="userPhoto" src={user.photoURL || previeUrl} />

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
                <Email setMessage={setMessage} />
                <Password />
            </div>
        </div>
    );
}

export default Setting;

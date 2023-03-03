import { storage } from "../lib/firebase/initialize";

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    updateMetadata,
    deleteObject,
} from "firebase/storage";
import { updateArticleUserPhoto } from "./useFireStore";
import { updateArticle } from "./useFireStore";
import { updataUserPhoto } from "./useFireAuthentication";

///* 儲存相片 *///
const addStorage = async (articleID, file, fileType) => {
    try {
        const storageRef = ref(storage, "images/" + articleID);
        const metadata = {
            contentType: fileType,
        };

        const uploadTask = await uploadBytesResumable(
            storageRef,
            file,
            metadata
        ).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updateArticle(articleID, downloadURL);
            });
        });
        return uploadTask;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

///* 更新相片 *///
const upDataStorage = async (articleID, file, fileType) => {
    try {
        const storageRef = ref(storage, "images/" + articleID);

        await deleteObject(storageRef)
            .then(() => {
                console.log("刪除檔案成功");
            })
            .catch((error) => {
                console.log("刪除檔案失敗");
            });

        const metadata = {
            contentType: fileType,
        };

        const uploadTask = await uploadBytesResumable(
            storageRef,
            file,
            metadata
        ).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updateArticle(articleID, downloadURL);
            });
        });
        return uploadTask;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

///* 儲存大頭照 *///
const addUserPhoto = async (userId, file, fileType, setMessage) => {
    try {
        const storageRef = ref(storage, "images-userPhoto/" + userId);
        const metadata = {
            contentType: fileType,
        };
        const uploadTask = await uploadBytesResumable(
            storageRef,
            file,
            metadata
        ).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                updataUserPhoto(downloadURL, setMessage);
                updateArticleUserPhoto(userId, downloadURL);
            });
        });
        return uploadTask;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

///* 刪除相片 *///
const deleteStorage = async (articleID) => {
    try {
        const storageRef = ref(storage, "images/" + articleID);

        await deleteObject(storageRef)
            .then(() => {
                // console.log("刪除檔案成功");
            })
            .catch((error) => {
                // console.log("刪除檔案失敗");
                return false;
            });
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

export { addStorage, addUserPhoto, upDataStorage, deleteStorage };

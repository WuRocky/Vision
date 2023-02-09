import { storage } from "../lib/firebase/initialize";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { updateArticle } from "./useFireStore";
import { updataUserPhoto } from "./useFireAuthentication";
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
            });
        });
        return uploadTask;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

export { addStorage, addUserPhoto };

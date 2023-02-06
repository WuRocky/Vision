import {
    addDoc,
    getDoc,
    collection,
    getDocs,
    doc,
    query,
    setDoc,
    WithFieldValue,
    QueryConstraint,
    Timestamp,
    updateDoc,
} from "firebase/firestore";

import { db, auth } from "../lib/firebase/initialize";

const updateArticle = async (storeId, imageUrl) => {
    try {
        const washingtonRef = doc(db, "article", storeId);
        const imageUrlDate = {
            imageUrl: imageUrl,
        };

        await updateDoc(washingtonRef, imageUrlDate);
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

const addData = async (title, content, topic, setFindMessage) => {
    try {
        const firebaseDB = collection(db, "article");

        const addFirestore = await addDoc(firebaseDB, {
            title: title,
            content: content,
            topic: topic,
            time: Timestamp.now(),
            imageUrl: "",
            author: {
                displayName: auth.currentUser.displayName || "",
                photoURL: auth.currentUser.photoURL || "",
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
            },
        });
        setFindMessage("發送成功");
        return addFirestore;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

const getData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "article"));
        return querySnapshot.docs.map((doc) => {
            const id = doc.id;

            return {
                ...doc.data(),
                id,
            };
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

const getTopicsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "topics"));
        return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};

const getArticle = async (id, setWriteData) => {
    try {
        const docRef = doc(db, "article", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return setWriteData(docSnap.data());
            // console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

export { addData, getData, getTopicsData, updateArticle, getArticle };

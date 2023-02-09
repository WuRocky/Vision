import {
    addDoc,
    getDoc,
    collection,
    getDocs,
    doc,
    query,
    setDoc,
    WithFieldValue,
    onSnapshot,
    Timestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
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

const addTrackUserId = async (id, uid) => {
    try {
        const washingtonRef = doc(db, "article", id);
        const imageUrlDate = {
            trackUserId: arrayUnion(uid),
        };

        await updateDoc(washingtonRef, imageUrlDate);
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

const reTrackUserId = async (id, uid) => {
    try {
        const washingtonRef = doc(db, "article", id);
        const imageUrlDate = {
            trackUserId: arrayRemove(uid),
        };

        await updateDoc(washingtonRef, imageUrlDate);
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

const addLikeUserId = async (id, uid) => {
    try {
        const washingtonRef = doc(db, "article", id);
        const imageUrlDate = {
            likeUserId: arrayUnion(uid),
        };

        await updateDoc(washingtonRef, imageUrlDate);
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

const reLikeUserId = async (id, uid) => {
    try {
        const washingtonRef = doc(db, "article", id);
        const imageUrlDate = {
            likeUserId: arrayRemove(uid),
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

// const getData = async () => {
//     try {
//         const querySnapshot = await getDocs(collection(db, "article"));
//         return querySnapshot.docs.map((doc) => {
//             const id = doc.id;
//             const data = {
//                 ...doc.data(),
//                 id,
//             };

//             return data;
//         });
//     } catch (e) {
//         console.error("Error getting documents: ", e);
//     }
// };

const getTopicsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "topics"));
        return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};

const getArticle = (id, setWriteData) => {
    const docRef = doc(db, "article", id);
    const unsub = onSnapshot(docRef, (doc) => {
        setWriteData(doc.data());
    });
    return unsub;
};

const getData = (setFirebaseData) => {
    const documents = collection(db, "article");
    onSnapshot(documents, (doc) => {
        setFirebaseData(
            doc.docs.map((doc) => {
                const id = doc.id;
                const data = {
                    ...doc.data(),
                    id,
                };

                return data;
            })
        );
    });

    // console.log(unsub);
    // return unsub;
};

export {
    addData,
    getData,
    getTopicsData,
    updateArticle,
    getArticle,
    addTrackUserId,
    reTrackUserId,
    addLikeUserId,
    reLikeUserId,
};

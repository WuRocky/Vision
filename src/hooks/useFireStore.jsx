import {
    addDoc,
    getDoc,
    collection,
    getDocs,
    doc,
    query,
    setDoc,
    WithFieldValue,
    where,
    onSnapshot,
    Timestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";

import { db, auth } from "../lib/firebase/initialize";

///* 更新文章圖片 *///
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

const updateArticleUserName = async (userId, userName) => {
    try {
        const q = query(collection(db, "article"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().author.uid == userId) {
                updateDoc(doc.ref, {
                    "author.displayName": userName,
                });
            }
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

///* 新增追蹤人數 *///
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

///* 移除追蹤人數 *///
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

///* 新增喜歡人數 *///
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

///* 移除喜歡人數 *///
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

///* 新增文章 *///
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

///* 得到分類 *///
const getTopicsData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "topics"));
        return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};

///* 得到文章 *///
const getArticle = (id, setWriteData) => {
    const docRef = doc(db, "article", id);
    const unsub = onSnapshot(docRef, (doc) => {
        setWriteData(doc.data());
    });
    return unsub;
};

///* 得到前兩個文章 *///
const getData = (setFirebaseData, currentTopics, setLastArticleRef) => {
    if (currentTopics) {
        const documents = query(
            collection(db, "article"),
            where("topic", "==", currentTopics),
            orderBy("time", "desc"),
            limit(2)
        );
        onSnapshot(documents, (doc) => {
            const data = doc.docs.map((doc) => {
                const id = doc.id;
                const data = {
                    ...doc.data(),
                    id,
                };
                return data;
            });
            setLastArticleRef(doc.docs[doc.docs.length - 1]);
            setFirebaseData(data);
        });
    } else {
        const documents = query(
            collection(db, "article"),
            orderBy("time", "desc"),
            limit(2)
        );
        onSnapshot(documents, (doc) => {
            const data = doc.docs.map((doc) => {
                const id = doc.id;
                const data = {
                    ...doc.data(),
                    id,
                };
                return data;
            });
            setLastArticleRef(doc.docs[doc.docs.length - 1]);
            setFirebaseData(data);
        });
    }
};

///* 得到後兩個文章 *///
const getDataAfter = (
    setFirebaseData,
    currentTopics,
    lastArticleRef,
    firebaseData,
    setLastArticleRef
) => {
    if (currentTopics) {
        const documents = query(
            collection(db, "article"),
            where("topic", "==", currentTopics),
            orderBy("time", "desc"),
            startAfter(lastArticleRef),
            limit(2)
        );
        onSnapshot(documents, (doc) => {
            const data = doc.docs.map((doc) => {
                const id = doc.id;
                const data = {
                    ...doc.data(),
                    id,
                };
                return data;
            });
            setLastArticleRef(doc.docs[doc.docs.length - 1]);
            setFirebaseData([...firebaseData, ...data]);
        });
    } else {
        const documents = query(
            collection(db, "article"),
            orderBy("time", "desc"),
            startAfter(lastArticleRef),
            limit(2)
        );
        onSnapshot(documents, (doc) => {
            const data = doc.docs.map((doc) => {
                const id = doc.id;
                const data = {
                    ...doc.data(),
                    id,
                };

                return data;
            });
            setLastArticleRef(doc.docs[doc.docs.length - 1]);
            setFirebaseData([...firebaseData, ...data]);
        });
    }
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
    getDataAfter,
    updateArticleUserName,
};

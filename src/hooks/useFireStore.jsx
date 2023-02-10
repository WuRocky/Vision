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

const getData = (setArticleData, currentTopics, setLastArticleRef) => {
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
            setArticleData(data);
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
            setArticleData(data);

            // setLastArticleRef(doc.docs[doc.docs.length - 1]);
        });
    }
};

const getDataAfter = (
    setArticleData,
    currentTopics,
    lastArticleRef,
    articleData,
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
            setArticleData([...articleData, ...data]);
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
            // setArticleData([...articleData, ...data]);
            setArticleData([...articleData, ...data]);
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
};

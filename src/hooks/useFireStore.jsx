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

///* 更新文章使用者圖片 *///
const updateArticleUserPhoto = async (userId, userPhoto) => {
    try {
        const q = query(collection(db, "article"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().author.uid == userId) {
                updateDoc(doc.ref, {
                    "author.photoURL": userPhoto,
                });
            }
        });
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
};

///* 更新文章使用者姓名 *///
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

///* 得到熱門作者 *///
const getPopularAuthor = (setPopularAuthor) => {
    const q = query(
        collection(db, "article"),
        where("likeUserId", "!=", false),
        orderBy("likeUserId"),
        limit(5)
    );

    onSnapshot(q, (doc) => {
        const authors = doc.docs.map((doc) => doc.data().author);
        const uids = Array.from(new Set(authors.map((author) => author.uid)));

        const filteredAuthors = [];
        uids.forEach((uid) => {
            const author = authors.find((author) => author.uid === uid);
            if (author.displayName && author.photoURL) {
                filteredAuthors.push(author);
            }
        });
        setPopularAuthor(filteredAuthors);
    });
};

///* 得到作者文章 *///
const getArticle = (id, setWriteData) => {
    const docRef = doc(db, "article", id);
    const unsub = onSnapshot(docRef, (doc) => {
        setWriteData(doc.data());
    });
    return unsub;
};

///* 得到前兩個文章 *///
const getData = (setFirebaseTwoDoc, currentTopics, setLastArticleRef) => {
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
            setFirebaseTwoDoc(data);
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
            setFirebaseTwoDoc(data);
        });
    }
};

///* 得到後兩個文章 *///
const getDataAfter = (
    setFirebaseTwoDoc,
    currentTopics,
    lastArticleRef,
    firebaseTwoDoc,
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
            setFirebaseTwoDoc([...firebaseTwoDoc, ...data]);
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
            setFirebaseTwoDoc([...firebaseTwoDoc, ...data]);
        });
    }
};

// 得到熱門文章
const getPopularData = (setPopularArticles) => {
    const documents = query(
        collection(db, "article"),
        orderBy("likeUserId", "desc"),
        limit(8)
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
        setPopularArticles(data);
    });
};

// 得到作者文章
const getMyData = (setMyArticles) => {
    const documents = query(collection(db, "article"));
    onSnapshot(documents, (doc) => {
        const data = doc.docs.map((doc) => {
            const id = doc.id;
            const data = {
                ...doc.data(),
                id,
            };
            return data;
        });
        setMyArticles(data);
    });
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
    getPopularData,
    getMyData,
    getPopularAuthor,
    updateArticleUserPhoto,
};

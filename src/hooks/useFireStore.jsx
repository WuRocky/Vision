import {
    addDoc,
    getDoc,
    collection,
    getDocs,
    doc,
    query,
    setDoc,
    writeBatch,
    where,
    onSnapshot,
    Timestamp,
    updateDoc,
    arrayUnion,
    arrayRemove,
    orderBy,
    limit,
    startAfter,
    deleteDoc,
    increment,
    serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../lib/firebase/initialize";

///* 新增留言 *///
const addMessage = (
    commentContent,
    storeId,
    uid,
    displayName,
    photoURL,
    setMessage
) => {
    const batch = writeBatch(db);
    const articleRef = doc(db, "article", storeId);
    batch.update(articleRef, {
        commentsContent: increment(1),
    });

    const commentRef = doc(collection(articleRef, "comment"));
    batch.set(commentRef, {
        content: commentContent,
        createdAt: serverTimestamp(),
        author: {
            uid: uid,
            displayName: displayName || "",
            photoURL: photoURL || "",
        },
    });

    batch
        .commit()
        .then(() => {
            setMessage("留言完成");
        })
        .catch((error) => {
            console.error("Error adding comment: ", error);
            setMessage("Error adding comment: ", error);
        });
};

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

///* 更新文章內容 *///
const updateUserArticleContent = async (
    id,
    title,
    content,
    topic,
    setFindMessage
) => {
    try {
        const firebaseDB = collection(db, "article");
        const q = doc(firebaseDB, id);

        const addFirestore = await updateDoc(q, {
            title: title,
            content: content,
            topic: topic,
            time: Timestamp.now(),
            imageUrl: "",
        });
        setFindMessage("更新成功");
        return addFirestore;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
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
        limit(8)
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

///* 得到前四個文章 *///
const getData = (setFirebaseTwoDoc, currentTopics, setLastArticleRef) => {
    if (currentTopics) {
        const documents = query(
            collection(db, "article"),
            where("topic", "==", currentTopics),
            orderBy("time", "desc"),
            limit(4)
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
            limit(4)
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

///* 得到後三個文章 *///
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
            limit(3)
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
            limit(3)
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

///* 得到熱門文章 *///
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

///* 得到作者所有文章 *///
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

///* 得到目前作者文章 *///
const getArticle = (id, setWriteData) => {
    const docRef = doc(db, "article", id);
    const unsub = onSnapshot(docRef, (doc) => {
        setWriteData(doc.data());
    });
    return unsub;
};

///* 刪除文件 *///
const removeDoc = async (myDoctId, setMessage) => {
    try {
        await deleteDoc(doc(db, "article", myDoctId));
        setMessage("刪除成功");
    } catch (error) {
        console.error("Error deleting document:", error);
        setMessage("刪除失敗");
    }
};

///* 得到文章留言 *///
const getArticleMessage = (id, setCommentContent) => {
    const docRef = collection(doc(db, "article", id), "comment");
    const unsub = onSnapshot(
        query(docRef, orderBy("createdAt", "desc")),
        (doc) => {
            const data = doc.docs.map((doc) => doc.data());
            setCommentContent(data);
        }
    );
    return unsub;
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
    removeDoc,
    updateUserArticleContent,
    addMessage,
    getArticleMessage,
};

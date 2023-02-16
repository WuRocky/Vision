import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./components/Footer";

import {
    getData,
    getTopicsData,
    getPopularData,
    getMyData,
    getPopularAuthor,
} from "./hooks/useFireStore";

import { getUser } from "./hooks/useFireAuthentication";
import Nav from "./components/Nav";

const AppContext = React.createContext();

const Layout = () => {
    // 取得前兩邊文章
    const [firebaseTwoDoc, setFirebaseTwoDoc] = useState([]);

    // 熱門文章
    const [popularArticles, setPopularArticles] = useState([]);

    // 得到熱門作者
    const [popularAuthor, setPopularAuthor] = useState([]);

    // 使用者文章
    const [myArticles, setMyArticles] = useState([]);

    // 登入者資訊
    const [user, setUser] = useState(null);

    // 文章分類
    const [topics, setTopics] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopics = urlSearchParams.get("topics");
    const articleRef = useRef();

    const [lastArticleRef, setLastArticleRef] = useState(articleRef.current);
    useEffect(() => {
        // 取得前兩邊文章
        getData(setFirebaseTwoDoc, currentTopics, setLastArticleRef);

        // 登入者資訊
        getUser(setUser);

        // 得到熱門作者
        getPopularAuthor(setPopularAuthor);

        // 熱門文章
        getPopularData(setPopularArticles);

        // 使用者文章
        getMyData(setMyArticles);

        // 文章分類
        getTopicsData().then((data) => {
            setTopics(data);
            setIsLoading(false);
        });
    }, [currentTopics]);
    if (isLoading) return <div>Loading...</div>;

    return (
        <AppContext.Provider
            value={{
                firebaseTwoDoc,
                setFirebaseTwoDoc,
                lastArticleRef,
                setLastArticleRef,
                user,
                setUser,
                topics,
                popularArticles,
                setPopularArticles,
                myArticles,
                popularAuthor,
            }}
        >
            <div>
                <Nav />
                <Outlet />
                <Footer />
            </div>
        </AppContext.Provider>
    );
};
export { AppContext };
export default Layout;

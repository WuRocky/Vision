import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import Footer from "./components/Footer";
import Notes from "./img/notes2.png";
import {
    getData,
    getTopicsData,
    getPopularData,
    getMyData,
} from "./hooks/useFireStore";

import { getUser, userSignOut } from "./hooks/useFireAuthentication";

const AppContext = React.createContext();

const Layout = () => {
    const [firebaseTwoDoc, setFirebaseTwoDoc] = useState([]);

    const [popularArticles, setPopularArticles] = useState([]);

    const [myArticles, setMyArticles] = useState([]);

    const [user, setUser] = useState(null);

    const [topics, setTopics] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const logout = () => {
        userSignOut();
        window.location.reload();
    };
    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopics = urlSearchParams.get("topics");
    const articleRef = useRef();

    const [lastArticleRef, setLastArticleRef] = useState(articleRef.current);
    useEffect(() => {
        getData(setFirebaseTwoDoc, currentTopics, setLastArticleRef);
        getUser(setUser);
        getPopularData(setPopularArticles);
        getMyData(setMyArticles);
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
            }}
        >
            <div>
                <div className="navContainer">
                    <div>
                        <Link to="/">
                            <img src={Notes} alt="Vision" />
                            <p>Vision</p>
                        </Link>
                        <nav>
                            <ul>
                                {user ? (
                                    <>
                                        <li>
                                            <Link to="/write">Write</Link>
                                        </li>
                                        <li>
                                            <Link to="/member">Member</Link>
                                        </li>
                                        <li>
                                            <Link onClick={logout}>
                                                Sign out
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link className="signIn" to="/signIn">
                                            Register/Sign In
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
                <Outlet />
                <Footer />
            </div>
        </AppContext.Provider>
    );
};
export { AppContext };
export default Layout;

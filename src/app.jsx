import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";

import Write from "./pages/Write";
import Member from "./pages/Member";

import Article from "./components/write/Article";
import UpdateMarkdown from "./components/write/UpdateMarkdown";

import SignIn from "./components/login/SignIn";

import "./style/style.css";
import { monitorUser } from "./hooks/useFireAuthentication";
const App = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        monitorUser(setUser);
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {user ? (
                        <>
                            <Route index element={<HomePage />}></Route>
                            <Route path="write" element={<Write />}></Route>
                            <Route
                                path="article/:id"
                                element={<Article />}
                            ></Route>
                            <Route
                                path="update-article/:id"
                                element={<UpdateMarkdown />}
                            ></Route>
                            <Route path="member" element={<Member />}></Route>
                            <Route
                                path="*"
                                element={<Navigate to="/" />}
                            ></Route>
                        </>
                    ) : (
                        <>
                            <Route index element={<HomePage />}></Route>
                            {/* <Route path="write" element={<Write />}></Route> */}
                            <Route path="signIn" element={<SignIn />}></Route>
                            <Route
                                path="article/:id"
                                element={<Article />}
                            ></Route>
                            <Route
                                path="*"
                                element={<Navigate to="/" />}
                            ></Route>
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

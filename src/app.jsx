import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";

import Write from "./pages/Write";
import Article from "./pages/Article";
import Member from "./pages/Member";

import SignIn from "./components/user/SignIn";

import "./style/style.css";
import { monitorUser } from "./hooks/useFireAuthentication";
const App = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        monitorUser(setUser);
        // window.location.reload();
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
                            <Route path="member" element={<Member />}></Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    ) : (
                        <>
                            <Route index element={<HomePage />}></Route>
                            <Route path="signIn" element={<SignIn />}></Route>
                            <Route
                                path="article/:id"
                                element={<Article />}
                            ></Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

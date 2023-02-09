import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";

import Write from "./pages/Write";
import Article from "./pages/Article";
import Member from "./pages/Member";

import Track from "./components/member/Track";
import Post from "./components/member/Post";

import SignIn from "./components/user/SignIn";

import "./style/style.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="write" element={<Write />}></Route>
                    <Route path="signIn" element={<SignIn />}></Route>
                    <Route path="article/:id" element={<Article />}></Route>
                </Route>
                <Route path="/" element={<Layout />}>
                    <Route path="member" element={<Member />}></Route>
                    <Route path="member/post" element={<Post />}></Route>
                    <Route path="member/track" element={<Track />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

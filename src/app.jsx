import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import HomePage from "./pages/HomePage";

import Write from "./pages/Write";
import Article from "./pages/Article";

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
            </Routes>
        </BrowserRouter>
    );
};

export default App;

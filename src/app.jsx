import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Write from "./pages/Write";
import Homepage from "./pages/HomePage";
import "./style/style.css";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />}></Route>
                    <Route path="write" element={<Write />}></Route>
                    {/* <Route path="*" element={<Page404 />}></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

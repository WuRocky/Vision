import { Outlet, Link } from "react-router-dom";
import React from "react";
import Footer from "./components/Footer";
import Notes from "./img/notes2.png";
const Layout = () => {
    return (
        <div>
            <div className="navContainer">
                <div>
                    <Link to="/">
                        <img src={Notes} alt="Vision" />
                        <h1>Vision</h1>
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Member</Link>
                            </li>
                            <li>
                                <Link to="/write">Write</Link>
                            </li>
                            <li>
                                <Link to="/">Sign in</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;

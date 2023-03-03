import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Notes from "../img/notes2.png";
import { AppContext } from "../Layout";
import { userSignOut } from "../hooks/useFireAuthentication";
const Nav = () => {
    const { user } = useContext(AppContext);
    const logout = () => {
        userSignOut();
        window.location.reload();
    };
    return (
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
                                    <Link onClick={logout}>Sign out</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* <li>
                                    <Link to="/write">Write</Link>
                                </li> */}
                                <li>
                                    <Link className="signIn" to="/signIn">
                                        Register / Sign In
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Nav;

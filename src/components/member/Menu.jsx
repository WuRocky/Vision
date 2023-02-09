import React from "react";
import { Link, useLocation } from "react-router-dom";
const Menu = () => {
    const location = useLocation();
    const menuItem = [
        { name: "會員資料", path: "/member" },
        { name: "個人文章", path: "/member/post" },
        { name: "個人收藏", path: "/member/track" },
    ];

    return (
        <div className="menu">
            {menuItem.map((item) => {
                return (
                    <Link
                        className={
                            item.path === location.pathname
                                ? "menu-item2"
                                : "menu-item"
                        }
                        to={item.path}
                        key={item.name}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
};

export default Menu;

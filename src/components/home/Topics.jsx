import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../../Layout";
const Topics = () => {
    const { topics } = useContext(AppContext);
    return (
        <div className="topics">
            <div className="topicsTitle">分類</div>
            <div className="topicsContainer">
                <ul>
                    {topics.map((data, index) => {
                        return (
                            <li key={index}>
                                <Link>{data.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Topics;

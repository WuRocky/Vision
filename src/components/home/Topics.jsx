import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { AppContext } from "../../Layout";
const Topics = () => {
    const { topics } = useContext(AppContext);

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopics = urlSearchParams.get("topics");
    return (
        <div className="topics">
            <div className="topicsTitle">分類</div>
            <div className="topicsContainer">
                <ul>
                    {topics.map((data, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    style={
                                        currentTopics === data.name
                                            ? { color: "black" }
                                            : { color: "gray" }
                                    }
                                    to={`?topics=${data.name}`}
                                >
                                    {data.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Topics;

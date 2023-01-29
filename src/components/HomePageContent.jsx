import React, { useContext, useCallback } from "react";
import { AppContext } from "../pages/HomePage";
import { useNavigate } from "react-router-dom";

const HomePageContent = () => {
    const { firebaseData } = useContext(AppContext);
    const navigate = useNavigate();

    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);
    return (
        <div>
            {firebaseData.map((data) => {
                return (
                    <div
                        key={data.id}
                        onClick={() => handleClick(data.id)}
                        className="homePageContent"
                    >
                        {data.title}
                    </div>
                );
            })}
        </div>
    );
};

export default HomePageContent;

import React from "react";
import HomePageContent from "../components/home/HomePageContent";

import Topics from "../components/home/Topics";
import Authors from "../components/home/Authors";
import Featured from "../components/home/Featured";
const HomePage = () => {
    return (
        <div className="homepage">
            <div className="homepage-container">
                <div className="homepage-container-item">
                    <div className="homepage-grid-item-1">
                        <Featured />
                    </div>
                    <div className="homepage-grid-item-2">
                        <HomePageContent />
                    </div>
                    <div className="homepage-grid-item-3">
                        <Topics />
                    </div>
                    <div className="homepage-grid-item-4">
                        <Authors />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

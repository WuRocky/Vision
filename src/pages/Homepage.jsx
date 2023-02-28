import React, { useContext } from "react";
import HomePageContent from "../components/home/HomePageContent";

import Topics from "../components/home/Topics";
import Authors from "../components/home/Authors";
import Featured from "../components/home/Featured";
import { Waypoint } from "react-waypoint";
import { AppContext } from "../Layout";
import { useLocation } from "react-router-dom";
import { getDataAfter } from "../hooks/useFireStore";
const HomePage = () => {
    const {
        firebaseTwoDoc,
        setFirebaseTwoDoc,
        lastArticleRef,
        setLastArticleRef,
    } = useContext(AppContext);

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopics = urlSearchParams.get("topics");
    return (
        <div className="homepage">
            <div className="homepage-container">
                <div className="homepage-container-item">
                    <div className="homepage-grid-item-1">
                        <Featured />
                    </div>
                    <div className="homepage-grid-item-2">
                        <HomePageContent />
                        <Waypoint
                            onEnter={() => {
                                if (lastArticleRef) {
                                    getDataAfter(
                                        setFirebaseTwoDoc,
                                        currentTopics,
                                        lastArticleRef,
                                        firebaseTwoDoc,
                                        setLastArticleRef
                                    );
                                }
                            }}
                            bottomOffset={-100}
                        />
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

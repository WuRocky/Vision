import React, { useState, useEffect } from "react";
import HomePageContent from "../components/HomePageContent";

import { db } from "../lib/firebase/initialize";
import { collection, getDocs } from "firebase/firestore";
const AppContext = React.createContext();

const HomePage = () => {
    const [firebaseData, setFirebaseData] = useState([]);
    const [authToken, setAuthToken] = useState(null);
    useEffect(() => {
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "article"));
            const data = querySnapshot.docs.map((doc) => doc.data());

            setFirebaseData(data);
        };
        getData();
    }, []);

    return (
        <div className="homepage">
            <AppContext.Provider
                value={{ firebaseData, authToken, setAuthToken }}
            >
                <HomePageContent />
            </AppContext.Provider>
        </div>
    );
};
export { AppContext };
export default HomePage;

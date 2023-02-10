import React, {
    useContext,
    useCallback,
    useEffect,
    useState,
    useRef,
} from "react";
import userPhoto from "../../img/user.png";
// import { AppContext } from "../../Layout";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import likeGray from "../../img/like-gray.png";
import tagsGray from "../../img/price-tag-gray.png";
import tagsBlack from "../../img/price-tag-black.png";
import { getData, getDataAfter } from "../../hooks/useFireStore";

const HomePageContent = () => {
    // const { firebaseData } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);
    const currentTopics = urlSearchParams.get("topics");
    const articleRef = useRef();

    const [articleData, setArticleData] = useState([]);
    const [lastArticleRef, setLastArticleRef] = useState(articleRef.current);
    useEffect(() => {
        // getData(setArticleData, currentTopics, setLastArticleRef);
        getData(setArticleData, currentTopics, setLastArticleRef);
    }, [currentTopics]);
    // console.log(lastArticleRef);
    // console.log(articleRef.current);
    return (
        <>
            <div className="homepage-content">
                {articleData.map((data, index) => {
                    return (
                        <Link
                            key={data.id}
                            onClick={() => handleClick(data.id)}
                            to={`/article/${data.id}`}
                            className={`homepage-content-item ${
                                index > 0 ? "borderTop" : ""
                            }`}
                        >
                            <div className="homepage-content-item-1">
                                <div>
                                    {data.author.photoURL ? (
                                        <img
                                            className="homepage-content-item-1-userPhoto"
                                            src={data.author.photoURL}
                                        />
                                    ) : (
                                        <img src={userPhoto} />
                                    )}
                                </div>
                                <div>{data.topic}</div>
                                <div>{data.author.displayName || "匿名"}</div>
                            </div>
                            <div className="homepage-content-item-2">
                                <div className="homepage-content-item-2-title">
                                    {data.title}
                                </div>
                                <p className="homepage-content-item-2-article">
                                    {data.content}
                                </p>
                                <img
                                    className="homepage-content-item-2-img"
                                    src={
                                        data.imageUrl ||
                                        "https://react.semantic-ui.com/images/wireframe/image.png"
                                    }
                                />
                            </div>
                            <div className="homepage-content-item-3">
                                <div className="homepage-content-item-3-like">
                                    <img src={likeGray} />
                                    <div>{data.likeUserId?.length || 0}</div>
                                </div>
                                <div className="homepage-content-item-3-like">
                                    <img
                                        src={
                                            data.trackUserId?.length
                                                ? tagsBlack
                                                : tagsGray
                                        }
                                    />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <Waypoint
                onEnter={() => {
                    if (lastArticleRef) {
                        getDataAfter(
                            setArticleData,
                            currentTopics,
                            lastArticleRef,
                            articleData,
                            setLastArticleRef
                        );
                    }
                }}
            />
        </>
    );
};

export default HomePageContent;

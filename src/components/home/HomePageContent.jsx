import React, { useContext, useCallback } from "react";
import userPhoto from "../../img/user.png";
import { AppContext } from "../../Layout";
import { useNavigate, Link } from "react-router-dom";

const HomePageContent = () => {
    const { firebaseData } = useContext(AppContext);
    // console.log(firebaseData);
    // console.log(firebaseData);
    const navigate = useNavigate();
    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);
    return (
        <div className="homepage-content">
            {firebaseData.map((data) => {
                return (
                    <Link
                        key={data.id}
                        onClick={() => handleClick(data.id)}
                        // onClick={() => to(data.id)}
                        to={`/article/${data.id}`}
                        className="homepage-content-item"
                    >
                        <div className="homepage-content-item-1">
                            <div>
                                {data.author.photoURL ? (
                                    <img src="data.author.photoURL" />
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
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Possimus nam nulla asperiores
                                sunt quisquam cum quidem quasi nesciunt enim
                                totam laborum eius doloremque, nostrum corporis
                                vitae nemo veritatis, voluptas quae?
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
                            <div>喜歡</div>
                            <div>追蹤</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default HomePageContent;

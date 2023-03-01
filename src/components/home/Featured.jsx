import React, { useContext, useCallback, useState, useEffect } from "react";
import { AppContext } from "../../Layout";
import { Link, useNavigate } from "react-router-dom";
import arrowLeft from "../../img/btn_leftArrow.png";
import arrowRight from "../../img/btn_rightArrow.png";

const Featured = () => {
    const { popularArticles } = useContext(AppContext);
    const navigate = useNavigate();
    // console.log(popularArticles);
    const [currentArticles, setCurrentArticles] = useState(
        popularArticles.slice(0, 5)
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClickLeft = () => {
        setCurrentIndex(currentIndex - 1);
        if (currentIndex === 0) {
            setCurrentIndex(popularArticles.length - 1);
        }
        setCurrentArticles(
            [
                ...popularArticles.slice(currentIndex, popularArticles.length),
                ...popularArticles.slice(0, currentIndex),
            ].slice(0, 5)
        );
    };

    const handleClickRight = () => {
        setCurrentIndex(currentIndex + 1);
        if (currentIndex === popularArticles.length - 1) {
            setCurrentIndex(0);
        }
        setCurrentArticles(
            [
                ...popularArticles.slice(
                    currentIndex + 1,
                    popularArticles.length
                ),
                ...popularArticles.slice(0, currentIndex + 1),
            ].slice(0, 5)
        );
    };

    const handleClick = useCallback((id) => {
        navigate(`/article/${id}`);
    }, []);

    return (
        <div className="featured">
            <div className="featured-title">精選文章</div>
            <div className="featured-popular">
                {currentArticles.map((data, index) => {
                    return (
                        <Link
                            key={data.id}
                            onClick={() => handleClick(data.id)}
                            to={`/article/${data.id}`}
                            className="featured-popular-content"
                        >
                            <div className="featured-popular-content-title">
                                {data.title}
                            </div>
                            <img
                                className="featured-popular-content-img"
                                src={
                                    data.imageUrl ||
                                    "https://react.semantic-ui.com/images/wireframe/image.png"
                                }
                            />
                        </Link>
                    );
                })}
            </div>
            <div className="featured-arrow">
                <img
                    className="featured-arrow-left"
                    src={arrowLeft}
                    onClick={handleClickLeft}
                />

                <img
                    className="featured-arrow-right"
                    src={arrowRight}
                    onClick={handleClickRight}
                />
            </div>
        </div>
    );
};

export default Featured;

import React, { useContext } from "react";

import { AppContext } from "../../Layout";

const Authors = () => {
    const { popularAuthor } = useContext(AppContext);
    // console.log(popularAuthor);
    return (
        <div className="authors">
            <div className="authors-title">熱門作者</div>
            <div className="authors-container">
                {popularAuthor.map((data, index) => {
                    return (
                        <div className="authors-content" key={index}>
                            <img
                                className="authors-content-img"
                                src={data.photoURL}
                            />
                            <div className="authors-content-name">
                                {data.displayName}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Authors;

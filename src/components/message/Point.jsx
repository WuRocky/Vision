import React from "react";

import { removeDoc } from "../../hooks/useFireStore";

const Point = ({ point, setPoint, myDoctId, setMessage }) => {
    const removeHandler = (e) => {
        e.preventDefault();
        removeDoc(myDoctId, setMessage);
        setPoint();
    };

    return (
        <div>
            {point && (
                <div className="point">
                    <div className="point-div">
                        <div className="point-bar"></div>
                        <div className="point-content">
                            <div className="point-content-item-1">
                                <div className="point-content-item-1-title">
                                    是否確定刪除?
                                </div>
                                <div className="point-content-item-1-content">
                                    {point}
                                </div>
                            </div>
                            <div className="point-content-item-2">
                                <div
                                    onClick={removeHandler}
                                    className="point-content-item-2-remove"
                                >
                                    刪除
                                </div>
                                <div
                                    onClick={() => setPoint()}
                                    className="point-content-item-2-close"
                                >
                                    取消
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Point;

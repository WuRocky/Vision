import React from "react";
import github from "../img/icons8-github-48.png";
import linktree from "../img/linktree.png";
import Notes from "../img/notes2.png";
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-contact-title">
                <h3>Copyright © </h3>
                <img src={Notes} />
                <h3>Vision</h3>
            </div>
            <div className="footer-contact-information">
                <div>
                    <h4>聯絡資訊</h4>
                </div>
                <div className="footer-contact-information-content">
                    <a href="https://github.com/WuRocky/" target="_blank">
                        <img src={github} />
                    </a>
                    <a href="https://linktr.ee/rocky_wide" target="_blank">
                        <img src={linktree} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;

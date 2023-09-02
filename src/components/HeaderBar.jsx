import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/HeaderBar.css";
import waldo from "../assets/waldo.png";
import wenda from "../assets/wenda.png";
import whitebeard from "../assets/whitebeard.png";
import Timer from "./Timer";
import PropTypes from "prop-types";

const HeaderBar = ({ resetGame, isRunning, timeConverter }) => {
    const navigate = useNavigate();

    const goToHomepage = () => {
        resetGame();
        navigate("/");
    };

    const goToLeaderboard = () => {
        navigate("/leaderboard");
    };

    return (
        <div className="headerBar">
            <div className="logo">
                <button className="homeLink" onClick={goToHomepage}>
                    Where&#39;s Waldo?
                </button>
            </div>
            {isRunning && (
                <div className="charactersToFind">
                    <img
                        src={waldo}
                        alt="Waldo face image"
                        className="character1"
                    />
                    <img
                        src={wenda}
                        alt="Wenda face image"
                        className="character2"
                    />
                    <img
                        src={whitebeard}
                        alt="Whitebeard face image"
                        className="character3"
                    />
                </div>
            )}
            <div className="headerRight">
                {isRunning ? (
                    <Timer timeConverter={timeConverter} />
                ) : (
                    <button
                        className="leaderboardBtn"
                        onClick={goToLeaderboard}
                    >
                        Leaderboard
                    </button>
                )}
            </div>
        </div>
    );
};

HeaderBar.propTypes = {
    resetGame: PropTypes.func,
    isRunning: PropTypes.bool,
    timeConverter: PropTypes.string,
};

export default HeaderBar;

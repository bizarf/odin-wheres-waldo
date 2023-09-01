import React from "react";
import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../styles/Game.css";
import waldoPuzzle from "../assets/whereswaldopuzzle.jpeg";
import NameEntry from "./NameEntry";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Game = ({
    targetCharacters,
    setTargetCharacters,
    timeConverter,
    time,
    leaderboard,
    setLeaderboard,
    resetGame,
    isRunning,
    setIsRunning,
}) => {
    const navigate = useNavigate();

    const [mousePosition, setMousePosition] = useState({
        xPercent: 0,
        yPercent: 0,
    });

    const dropdownMenuOpen = (e) => {
        const dropdownMenuDiv = document.querySelector(".dropdownMenu");

        if (isRunning) {
            // gets mouse position based on user's window resolution
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // convert the mouse position to percent by dividing the window content area with the current user's window resolution, and then multiplying by 100 for the number to be in percent
            const xPercent = parseInt((x / window.innerWidth) * 100);
            const yPercent = parseInt((y / window.innerHeight) * 100);
            // move the dropdown menu to where the user clicked and then make it appear
            dropdownMenuDiv.style.left = `${x}px`;
            dropdownMenuDiv.style.top = `${y}px`;
            dropdownMenuDiv.style.display = "block";
            // send the mouse position in percent to the mouse position state. This will be used for when the user wants to tag the photo
            setMousePosition({ xPercent: xPercent, yPercent: yPercent });
        }
    };

    const [victory, setVictory] = useState(false);

    // use the every function to check if the found property across all three characters is the same
    useEffect(() => {
        const result = targetCharacters
            .map((character) => character.found)
            .every((status) => status === true);
        if (result === true) {
            setIsRunning(false);
            if (victory === false) {
                setVictory((state) => !state);
            }
        }
    }, [targetCharacters]);

    useEffect(() => {
        if (victory === false && isRunning === false) {
            navigate("/");
        }
    }),
        [];

    return (
        <div>
            <img
                src={waldoPuzzle}
                className="game"
                onClick={dropdownMenuOpen}
            />
            {/* if the user hasn't won, then render the dropdown menu. if the user has won then render the name entry div instead */}
            {!victory ? (
                <DropdownMenu
                    targetCharacters={targetCharacters}
                    setTargetCharacters={setTargetCharacters}
                    mousePosition={mousePosition}
                />
            ) : (
                <NameEntry
                    timeConverter={timeConverter}
                    leaderboard={leaderboard}
                    setLeaderboard={setLeaderboard}
                    time={time}
                    resetGame={resetGame}
                />
            )}
        </div>
    );
};

Game.propTypes = {
    resetGame: PropTypes.func,
    isRunning: PropTypes.bool,
    timeConverter: PropTypes.string,
    targetCharacters: PropTypes.array,
    setTargetCharacters: PropTypes.func,
    time: PropTypes.number,
    leaderboard: PropTypes.array,
    setLeaderboard: PropTypes.func,
    setIsRunning: PropTypes.func,
};

export default Game;

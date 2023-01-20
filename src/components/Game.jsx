import { useEffect, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import "../styles/Game.css";
import waldoPuzzle from "../assets/whereswaldopuzzle.jpeg";
import NameEntry from "./NameEntry";

const Game = (props) => {
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const [mousePosition, setMousePosition] = useState({
        xPercent: 0,
        yPercent: 0,
    });

    const dropdownMenuOpen = (e) => {
        const dropdownMenuDiv = document.querySelector(".dropdownMenu");

        if (dropdownMenu) {
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
            // set the dropdownMenu to true
            // setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        } else {
            // if dropdownMenu is true, then the next time the user clicks the dropdown menu will disappear. the dropdownMenu state is then set to false to allow the next click to bring up the menu
            setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        }
    };

    const [victory, setVictory] = useState(false);

    // use the every function to check if the found property across all three characters is the same
    const victoryCheck = () => {
        const check = props.targetCharacters
            .map((character) => character.found)
            .every((status) => {
                if (status === true) {
                    props.setIsRunning(false);
                    setDropdownMenu(false);
                    setVictory((state) => !state);
                }
            });
    };

    return (
        <div>
            <img
                src={waldoPuzzle}
                className="game"
                onClick={dropdownMenuOpen}
            />
            {/* {dropdownMenu && (
                <DropdownMenu
                    characterMark={props.characterMark}
                    targetCharacters={props.targetCharacters}
                    setTargetCharacters={props.setTargetCharacters}
                    mousePosition={mousePosition}
                    victoryCheck={victoryCheck}
                />
            )} */}
            {!victory ? (
                <DropdownMenu
                    characterMark={props.characterMark}
                    targetCharacters={props.targetCharacters}
                    setTargetCharacters={props.setTargetCharacters}
                    mousePosition={mousePosition}
                    victoryCheck={victoryCheck}
                />
            ) : (
                <NameEntry
                    timeConverter={props.timeConverter}
                    leaderboard={props.leaderboard}
                    setLeaderboard={props.setLeaderboard}
                    time={props.time}
                    resetGame={props.resetGame}
                />
            )}

            {/* {victory && (
                <NameEntry
                    timeConverter={props.timeConverter}
                    leaderboard={props.leaderboard}
                    setLeaderboard={props.setLeaderboard}
                    time={props.time}
                    resetGame={props.resetGame}
                />
            )} */}
        </div>
    );
};

export default Game;

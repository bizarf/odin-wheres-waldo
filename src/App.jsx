import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import HeaderBar from "./components/HeaderBar";

import "./styles/App.css";

const App = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const [mousePosition, setMousePosition] = useState({
        xPercent: 0,
        yPercent: 0,
    });

    const [targetCharacters, setTargetCharacters] = useState([
        {
            name: "character1",
            found: false,
            coordinates: [50, 20],
        },
        {
            name: "character2",
            found: false,
            coordinates: [16, 32],
        },
        {
            name: "character3",
            found: false,
            coordinates: [84, 22],
        },
    ]);

    const dropdownMenuOpen = (e) => {
        const dropdownMenuDiv = document.querySelector(".dropdownMenu");

        if (dropdownMenu === false) {
            // gets mouse position based on user's window resolution
            const x = e.clientX;
            const y = e.clientY;
            // convert the mouse position to percent by dividing the window content area with the current user's window resolution, and then multiplying by 100 for the number to be in percent
            const xPercent = parseInt((e.clientX / window.innerWidth) * 100);
            const yPercent = parseInt((e.clientY / window.innerHeight) * 100);
            // move the dropdown menu to where the user clicked and then make it appear
            dropdownMenuDiv.style.left = `${x}px`;
            dropdownMenuDiv.style.top = `${y}px`;
            dropdownMenuDiv.style.display = "block";
            // send the mouse position in percent to the mouse position state. This will be used for when the user wants to tag the photo
            setMousePosition({ xPercent: xPercent, yPercent: yPercent });
            console.log(mousePosition);
            // set the dropdownMenu to true
            setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        } else {
            // if dropdownMenu is true, then the next time the user clicks the dropdown menu will disappear. the dropdownMenu state is then set to false to allow the next click to bring up the menu
            dropdownMenuDiv.style.display = "none";
            setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        }
    };

    const characterMark = (target) => {
        // copy the array and then map it out
        const arrayCopy = targetCharacters.map((character) => {
            if (character.name === target) {
                if (character.found === false) {
                    const targetX = character.coordinates[0];
                    const targetY = character.coordinates[1];
                    if (
                        inRange(
                            targetX,
                            mousePosition.xPercent - 5,
                            mousePosition.xPercent + 5
                        ) === true &&
                        inRange(
                            targetY,
                            mousePosition.yPercent - 5,
                            mousePosition.yPercent + 5
                        ) === true
                    ) {
                        console.log(`you found ${character.name}`);
                        // update the array to switch found property to true
                        return { ...character, found: !character.found };
                    }
                }
            }
            // if character is not at mouse coordinates then return the unmodified copied array
            return character;
        });
        // update the targetCharacters in the state with the spread operator
        setTargetCharacters([...arrayCopy]);
    };

    // check if value is within range
    const inRange = (val, min, max) => {
        return (val - min) * (val - max) <= 0;
    };

    return (
        <div className="app">
            <BrowserRouter>
                <HeaderBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                dropdownMenuOpen={dropdownMenuOpen}
                                characterMark={characterMark}
                            />
                        }
                    />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import HeaderBar from "./components/HeaderBar";

import "./styles/App.css";

const App = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);

    const dropdownMenuOpen = (e) => {
        const dropdownMenuDiv = document.querySelector(".dropdownMenu");

        // console.log(e);

        if (dropdownMenu === false) {
            const x = e.clientX;
            const y = e.clientY;
            dropdownMenuDiv.style.left = `${x}px`;
            dropdownMenuDiv.style.top = `${y}px`;
            dropdownMenuDiv.style.display = "block";
            setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        } else {
            dropdownMenuDiv.style.display = "none";
            setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        }
    };

    return (
        <div className="app">
            <BrowserRouter>
                <HeaderBar />
                <Routes>
                    <Route
                        path="/"
                        element={<Home dropdownMenuOpen={dropdownMenuOpen} />}
                    />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

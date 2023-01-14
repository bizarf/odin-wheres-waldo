import {
    getFirestore,
    doc,
    getDoc,
    collection,
    setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import HeaderBar from "./components/HeaderBar";
import { app } from "./components/firebaseConfig";

import "./styles/App.css";

const App = () => {
    // after the app renders, get the character locations from the Firestore database.
    useEffect(() => {
        const getTargetData = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, "Waldo", "targets");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const targetData = docSnap.data().targetCharacters;
                setTargetCharacters([...targetData]);
            } else {
                console.log("No such document");
            }
        };
        getTargetData();
    }, []);

    const [dropdownMenu, setDropdownMenu] = useState(false);

    const [mousePosition, setMousePosition] = useState({
        xPercent: 0,
        yPercent: 0,
    });

    const [targetCharacters, setTargetCharacters] = useState([
        // {
        //     name: "character1",
        //     found: false,
        //     coordinates: [75, 79],
        // },
        // {
        //     name: "character2",
        //     found: false,
        //     coordinates: [88, 45],
        // },
        // {
        //     name: "character3",
        //     found: false,
        //     coordinates: [30, 63],
        // },
    ]);

    return (
        <div className="app">
            <BrowserRouter>
                <HeaderBar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/game"
                            element={
                                <Game
                                    dropdownMenu={dropdownMenu}
                                    setDropdownMenu={setDropdownMenu}
                                    mousePosition={mousePosition}
                                    setMousePosition={setMousePosition}
                                    targetCharacters={targetCharacters}
                                    setTargetCharacters={setTargetCharacters}
                                />
                            }
                        />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;

import {
    getFirestore,
    doc,
    getDoc,
    collection,
    setDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import HeaderBar from "./components/HeaderBar";
import { app } from "./components/firebaseConfig";
import "./styles/App.css";

const App = () => {
    const [error, setError] = useState(false);

    // after the app renders, get the character locations from the Firestore database.

    // gets the target data from firestore
    const getTargetData = async () => {
        try {
            const db = getFirestore(app);
            const docRef = doc(db, "Waldo", "targets");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const targetData = docSnap.data().targetCharacters;
                setTargetCharacters([...targetData]);
            } else {
                console.log("No such document");
            }
        } catch (er) {
            setError(true);
            document.querySelector(".startBtn").disabled = true;
        }
    };

    useEffect(() => {
        getTargetData();
    }, []);

    // array containing the target data
    const [targetCharacters, setTargetCharacters] = useState([]);

    // timer code
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            // use the setInterval function to update the time state by adding 1 second for every 1000 milliseconds.
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // function that converts the seconds value from time into hour:minute:second format using the date function
    const timeConverter = (time) => {
        const date = new Date(null);
        date.setSeconds(time);
        return date.toISOString().slice(11, 19);
    };

    // leaderboard stuff
    const [leaderboard, setLeaderboard] = useState([]);

    // when the app renders get the leaderboard data from firestore
    useEffect(() => {
        const getLeaderboardData = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, "Waldo", "leaderboard");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const targetData = docSnap.data().leaderboardData;
                setLeaderboard([...targetData]);
            } else {
                console.log("No such document");
            }
        };
        getLeaderboardData();
    }, []);

    // if the leaderboard state updates, then we'll write the array to firestore
    useEffect(() => {
        if (leaderboard.length != 0) {
            const db = getFirestore(app);
            const docRef = collection(db, "Waldo");

            setDoc(doc(docRef, "leaderboard"), {
                leaderboardData: leaderboard,
            });
        }
    }, [leaderboard]);

    const resetGame = () => {
        setTargetCharacters([]);
        getTargetData();
        setTime(0);
        if (isRunning) {
            setIsRunning((state) => !state);
        }
    };

    return (
        <HashRouter>
            <div className="app">
                <HeaderBar
                    timeConverter={timeConverter(time)}
                    isRunning={isRunning}
                    resetGame={resetGame}
                />
                {/* <div className="content"> */}
                <Routes>
                    <Route
                        path="/"
                        element={<Home setIsRunning={setIsRunning} />}
                    />
                    <Route
                        path="/game"
                        element={
                            <Game
                                targetCharacters={targetCharacters}
                                setTargetCharacters={setTargetCharacters}
                                timeConverter={timeConverter(time)}
                                time={time}
                                leaderboard={leaderboard}
                                setLeaderboard={setLeaderboard}
                                resetGame={resetGame}
                                isRunning={isRunning}
                                setIsRunning={setIsRunning}
                            />
                        }
                    />
                    <Route
                        path="/leaderboard"
                        element={
                            <Leaderboard
                                timeConverter={timeConverter}
                                leaderboard={leaderboard}
                            />
                        }
                    />
                </Routes>
                {/* </div> */}
            </div>
            {error && (
                <div className="errorDiv">
                    <h1 className="errorMsg">
                        Error. Could not communicate with Firebase.
                    </h1>
                </div>
            )}
        </HashRouter>
    );
};

export default App;

import "../styles/NameEntry.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../components/firebaseConfig";

const NameEntry = (props) => {
    // bad word filter stuff
    const [naughtywords, setNaughtywords] = useState([]);

    // on render get the bad word array from the firestore db
    useEffect(() => {
        const getNaughtywordsData = async () => {
            const db = getFirestore(app);
            const docRef = doc(db, "Waldo", "naughtywords");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const targetData = docSnap.data().naughtywordsData;
                setNaughtywords([...targetData]);
            } else {
                console.log("No such document");
            }
        };
        getNaughtywordsData();
    }, []);

    // function to check the array if it includes a bad word. returns true if found and false if not found
    const wordFilter = (name) => {
        if (naughtywords.some((word) => name.includes(word))) {
            return true;
        } else {
            return false;
        }
    };

    const navigate = useNavigate();
    // submit button code
    const submitEntry = () => {
        const playerName = document.querySelector("#playerName");
        // if player name is blank, tell the user to enter a name
        if (!playerName.checkValidity()) {
            playerName.reportValidity();
        }

        // if the word filter returns false, then add the player's name and their time to the leaderboard. if true, then replace their name with a generic censored name
        if (!wordFilter(playerName.value)) {
            const newEntry = { name: playerName.value, time: props.time };
            props.setLeaderboard([...props.leaderboard, newEntry]);
            navigate("/leaderboard");
            props.resetGame();
        } else {
            const newEntry = { name: "*****", time: props.time };
            props.setLeaderboard([...props.leaderboard, newEntry]);
            navigate("/leaderboard");
            props.resetGame();
        }
    };

    const cancelReset = () => {
        props.resetGame();
        navigate("/");
    };

    return (
        <div className="nameEntry">
            <div className="nameEntry-modal"></div>
            <div className="nameEntry-main">
                <h1>You finished in {props.timeConverter}!</h1>
                <h3>Submit your score to the leaderboard!</h3>
                <div className="nameEntry-form">
                    <label htmlFor="playerName" className="nameEntry-nameLabel">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="playerName"
                        id="playerName"
                        maxLength="20"
                        required
                    />
                </div>
                <div className="nameEntry-buttons">
                    <button onClick={cancelReset} className="nameEntry-cancel">
                        Cancel
                    </button>
                    <button onClick={submitEntry} className="nameEntry-submit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NameEntry;

import "../styles/NameEntry.css";
import { useNavigate } from "react-router-dom";

const NameEntry = (props) => {
    const navigate = useNavigate();

    const submitEntry = () => {
        const nameEntryDiv = document.querySelector(".nameEntry");

        const newEntry = { name: playerName.value, time: props.time };
        props.setLeaderboard([...props.leaderboard, newEntry]);
        nameEntryDiv.style.display = "none";
        navigate("/leaderboard");
        props.resetGame();
    };

    const cancelReset = () => {
        const nameEntryDiv = document.querySelector(".nameEntry");
        nameEntryDiv.style.display = "none";
        props.resetGame();
        navigate("/");
    };

    return (
        <div className="nameEntry">
            <div className="nameEntry-modal"></div>
            <div className="nameEntry-main">
                <h1>You finished in {props.timeConverter}!</h1>
                <p>Submit your score to the leaderboard!</p>
                <label htmlFor="playerName">Name:</label>
                <input type="text" name="playerName" id="playerName" />
                <div>
                    <button onClick={cancelReset}>Cancel</button>
                    <button onClick={submitEntry}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default NameEntry;

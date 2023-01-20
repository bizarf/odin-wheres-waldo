import "../styles/NameEntry.css";
import { useNavigate } from "react-router-dom";

const NameEntry = (props) => {
    const navigate = useNavigate();

    const submitEntry = () => {
        const playerName = document.querySelector("#playerName");
        if (!playerName.checkValidity()) {
            playerName.reportValidity();
        } else {
            const newEntry = { name: playerName.value, time: props.time };
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

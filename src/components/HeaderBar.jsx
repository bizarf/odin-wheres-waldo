import { Link } from "react-router-dom";
import "../styles/HeaderBar.css";
import waldo from "../assets/waldo.png";
import wenda from "../assets/wenda.png";
import whitebeard from "../assets/whitebeard.png";
import Timer from "./Timer";

const HeaderBar = (props) => {
    return (
        <div className="headerBar">
            <div>
                <Link to="/">Where's Waldo?</Link>
            </div>
            {props.isRunning && (
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
                {props.isRunning ? (
                    <Timer timeConverter={props.timeConverter} />
                ) : (
                    <Link to="/Leaderboard">
                        <button className="leaderboardBtn">Leaderboard</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default HeaderBar;

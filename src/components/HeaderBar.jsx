import { Link } from "react-router-dom";
import "../styles/HeaderBar.css";
import waldo from "../assets/waldo.png";
import wenda from "../assets/wenda.png";
import whitebeard from "../assets/whitebeard.png";

const HeaderBar = () => {
    return (
        <div className="headerBar">
            <div>
                <Link to="/">Logo goes here</Link>
            </div>
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
            <div className="headerRight">
                <div className="timer">Timer goes here</div>
                <Link to="/Leaderboard">
                    <button>Leaderboard</button>
                </Link>
            </div>
        </div>
    );
};

export default HeaderBar;

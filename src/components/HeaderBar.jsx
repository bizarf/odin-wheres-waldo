import { Link } from "react-router-dom";
import "../styles/HeaderBar.css";

const HeaderBar = () => {
    return (
        <div className="headerBar">
            <div>
                <Link to="/">Logo goes here</Link>
            </div>
            <div className="charactersToFind">
                <div>Character 1</div>
                <div>Character 2</div>
                <div>Character 3</div>
            </div>
            <div>
                <Link to="/Leaderboard">
                    <button>Leaderboard</button>
                </Link>
            </div>
        </div>
    );
};

export default HeaderBar;

import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import waldo from "../assets/waldo.png";
import wenda from "../assets/wenda.png";
import whitebeard from "../assets/whitebeard.png";

const Home = (props) => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate("/game");
        props.setIsRunning(true);
    };

    return (
        <div>
            <div className="home-container">
                <div className="homeBackground"></div>
                <div className="homePageWelcome">
                    <h3>How fast can you find Waldo and his friends?</h3>
                    <div>
                        <img src={waldo} alt="Waldo" className="homeTargets" />
                        <img src={wenda} alt="Wenda" className="homeTargets" />
                        <img
                            src={whitebeard}
                            alt="Whitebeard"
                            className="homeTargets"
                        />
                    </div>
                    <button onClick={startGame} className="startBtn">
                        Start game
                    </button>
                </div>
            </div>
            <div className="footer">
                <span>
                    Page created by{" "}
                    <a href="https://github.com/bizarf">Bizarf</a>
                </span>
            </div>
        </div>
    );
};

export default Home;

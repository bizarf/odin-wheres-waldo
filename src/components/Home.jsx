import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = (props) => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate("/game");
        props.setIsRunning(true);
    };

    return (
        <div>
            <div>Home page goes</div>
            <button onClick={startGame}>Start game</button>
        </div>
    );
};

export default Home;

import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate("/game");
    };

    return (
        <div>
            <div>Home page goes</div>
            <button onClick={startGame}>Start game</button>
        </div>
    );
};

export default Home;

import DropdownMenu from "./DropdownMenu";
import "../styles/Home.css";

const Home = (props) => {
    return (
        <div>
            <div className="game" onClick={props.dropdownMenuOpen}>
                Game goes here
            </div>
            <DropdownMenu characterMark={props.characterMark} />
        </div>
    );
};

export default Home;

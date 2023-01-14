import DropdownMenu from "./DropdownMenu";
import "../styles/Game.css";
import waldoPuzzle from "../assets/whereswaldopuzzle.jpeg";

const Game = (props) => {
    const dropdownMenuOpen = (e) => {
        const dropdownMenuDiv = document.querySelector(".dropdownMenu");

        if (props.dropdownMenu === false) {
            // gets mouse position based on user's window resolution
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // convert the mouse position to percent by dividing the window content area with the current user's window resolution, and then multiplying by 100 for the number to be in percent
            const xPercent = parseInt((x / window.innerWidth) * 100);
            const yPercent = parseInt((y / window.innerHeight) * 100);
            // move the dropdown menu to where the user clicked and then make it appear
            dropdownMenuDiv.style.left = `${x}px`;
            dropdownMenuDiv.style.top = `${y}px`;
            dropdownMenuDiv.style.display = "block";
            // send the mouse position in percent to the mouse position state. This will be used for when the user wants to tag the photo
            props.setMousePosition({ xPercent: xPercent, yPercent: yPercent });
            console.log(props.mousePosition);
            // set the dropdownMenu to true
            props.setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        } else {
            // if dropdownMenu is true, then the next time the user clicks the dropdown menu will disappear. the dropdownMenu state is then set to false to allow the next click to bring up the menu
            dropdownMenuDiv.style.display = "none";
            props.setDropdownMenu((prevDropdownMenu) => !prevDropdownMenu);
        }
    };

    return (
        <div>
            <img
                src={waldoPuzzle}
                className="game"
                onClick={dropdownMenuOpen}
            />
            <DropdownMenu
                characterMark={props.characterMark}
                targetCharacters={props.targetCharacters}
                setTargetCharacters={props.setTargetCharacters}
                mousePosition={props.mousePosition}
            />
        </div>
    );
};

export default Game;

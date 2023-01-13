import "../styles/DropdownMenu.css";

const DropdownMenu = (props) => {
    return (
        <div className="dropdownMenu">
            <ul className="targetCharacters">
                <li
                    className="targetCharacter"
                    onClick={() => props.characterMark("character1")}
                >
                    Character 1
                </li>
                <li
                    className="targetCharacter"
                    onClick={() => props.characterMark("character2")}
                >
                    Character 2
                </li>
                <li
                    className="targetCharacter"
                    onClick={() => props.characterMark("character3")}
                >
                    Character 3
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;

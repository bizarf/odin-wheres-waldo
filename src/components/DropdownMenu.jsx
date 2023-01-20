import "../styles/DropdownMenu.css";

const DropdownMenu = (props) => {
    const characterMark = (target) => {
        const characterMarkHeader = (character) => {
            const foundCharacter = document.querySelector(`.${character}`);
            foundCharacter.classList.add("found");
        };

        // copy the array and then map it out
        const arrayCopy = props.targetCharacters.map((character) => {
            if (character.name === target) {
                if (character.found === false) {
                    const targetX = character.coordinates[0];
                    const targetY = character.coordinates[1];
                    if (
                        inRange(
                            targetX,
                            props.mousePosition.xPercent - 5,
                            props.mousePosition.xPercent + 5
                        ) === true &&
                        inRange(
                            targetY,
                            props.mousePosition.yPercent - 5,
                            props.mousePosition.yPercent + 5
                        ) === true
                    ) {
                        console.log(`you found ${character.name}`);
                        characterMarkHeader(character.name);
                        // update the array to switch found property to true
                        return { ...character, found: !character.found };
                    }
                }
            }
            // if character is not at mouse coordinates then return the unmodified copied array
            return character;
        });
        // update the targetCharacters in the state with the spread operator
        props.setTargetCharacters([...arrayCopy]);
        props.victoryCheck();
    };

    // check if value is within range
    const inRange = (val, min, max) => {
        return (val - min) * (val - max) <= 0;
    };

    return (
        <div className="dropdownMenu">
            <ul className="targetCharacters">
                <li
                    className="targetCharacter"
                    onClick={() => characterMark("character1")}
                >
                    Waldo
                </li>
                <li
                    className="targetCharacter"
                    onClick={() => characterMark("character2")}
                >
                    Wenda
                </li>
                <li
                    className="targetCharacter"
                    onClick={() => characterMark("character3")}
                >
                    Whitebeard
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;

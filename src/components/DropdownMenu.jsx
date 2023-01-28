import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import "../styles/DropdownMenu.css";

const DropdownMenu = (props) => {
    const getLocationData = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, "Waldo", "targetsLocation");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const location = docSnap.data().location;
            locationData = location;
        } else {
            console.log("No such document");
        }
    };

    let locationData = getLocationData();

    const findIndex = (character) => {
        return locationData.map((data) => data.name).indexOf(character);
    };

    const characterMark = (target) => {
        const characterMarkHeader = (character) => {
            const foundCharacter = document.querySelector(`.${character}`);
            foundCharacter.classList.add("found");
        };

        // copy the array and then map it out
        const arrayCopy = props.targetCharacters.map((character) => {
            if (character.name === target) {
                if (character.found === false) {
                    const index = findIndex(character.name);
                    const targetX = locationData[index].coordinates[0];
                    const targetY = locationData[index].coordinates[1];
                    if (
                        inRange(
                            targetX,
                            props.mousePosition.xPercent - 1,
                            props.mousePosition.xPercent + 1
                        ) === true &&
                        inRange(
                            targetY,
                            props.mousePosition.yPercent - 1,
                            props.mousePosition.yPercent + 1
                        ) === true
                    ) {
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

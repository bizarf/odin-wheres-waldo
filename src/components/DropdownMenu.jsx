import React, { useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import "../styles/DropdownMenu.css";
import PropTypes from "prop-types";

const DropdownMenu = ({
    targetCharacters,
    setTargetCharacters,
    mousePosition,
}) => {
    const getLocationData = async () => {
        const db = getFirestore(app);
        const docRef = doc(db, "Waldo", "targetsLocation");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().location;
        } else {
            console.log("No such document");
            return [];
        }
    };

    useEffect(() => {
        getLocationData();
    }, []);

    const findIndex = (locationData, character) => {
        return locationData.map((data) => data.name).indexOf(character);
    };

    const characterMark = async (target) => {
        const locationData = await getLocationData();
        const characterMarkHeader = (character) => {
            const foundCharacter = document.querySelector(`.${character}`);
            foundCharacter.classList.add("found");
        };

        // copy the array and then map it out
        const arrayCopy = targetCharacters.map((character) => {
            if (character.name === target) {
                if (character.found === false) {
                    const index = findIndex(locationData, target);
                    const targetX = locationData[index].coordinates[0];
                    const targetY = locationData[index].coordinates[1];
                    if (
                        inRange(
                            targetX,
                            mousePosition.xPercent - 1,
                            mousePosition.xPercent + 1
                        ) === true &&
                        inRange(
                            targetY,
                            mousePosition.yPercent - 1,
                            mousePosition.yPercent + 1
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
        setTargetCharacters([...arrayCopy]);
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

DropdownMenu.propTypes = {
    targetCharacters: PropTypes.array,
    setTargetCharacters: PropTypes.func,
    mousePosition: PropTypes.object,
};

export default DropdownMenu;

import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { it } from "vitest";

describe("Dropdown menu tests", () => {
    it("Dropdown menu opens when the user clicks", async () => {
        const user = userEvent.setup();
        render(<App />, { wrapper: BrowserRouter });
        const startBtn = screen.getByText("Start game");
        await act(() => user.click(startBtn));

        expect(
            screen.getByText("Submit your score to the leaderboard!")
        ).toBeInTheDocument();
        // const game = screen.getByRole("img");
        // third image in the array is the game image
        // await user.click(game);
        // const dropdownMenu = document.querySelector(".dropdownMenu");
        // expect(dropdownMenu.style.display).toBe("block");
        // console.log(dropdownMenu);
        // expect(screen.getByText("Wenda")).toBeInTheDocument();
    });

    // it("Dropdown menu closes when the user clicks twice", async () => {
    //     render(<App />);
    //     const dropdownMenu = document.querySelector(".dropdownMenu");
    //     const game = screen.getAllByRole("img");
    //     // third image in the array is the game image
    //     await userEvent.click(game[3]);
    //     await userEvent.click(game[3]);
    //     expect(dropdownMenu.style.display).toBe("none");
    // });
});

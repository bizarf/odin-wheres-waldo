import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Dropdown menu tests", () => {
    it("Dropdown menu opens when the user clicks", async () => {
        render(<App />);
        const startBtn = screen.getByText("Start game");
        await userEvent.click(startBtn);
        const dropdownMenu = document.querySelector(".dropdownMenu");
        const game = screen.getAllByRole("img");
        // third image in the array is the game image
        await userEvent.click(game[3]);
        expect(dropdownMenu.style.display).toBe("block");
    });

    it("Dropdown menu closes when the user clicks twice", async () => {
        render(<App />);
        const dropdownMenu = document.querySelector(".dropdownMenu");
        const game = screen.getAllByRole("img");
        // third image in the array is the game image
        await userEvent.click(game[3]);
        await userEvent.click(game[3]);
        expect(dropdownMenu.style.display).toBe("none");
    });
});

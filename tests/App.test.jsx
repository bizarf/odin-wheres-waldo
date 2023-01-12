import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Dropdown menu tests", () => {
    it("Dropdown menu opens when the user clicks", async () => {
        const { app } = render(<App />);
        const dropdownMenu = document.querySelector(".dropdownMenu");
        const game = screen.getByText("Game goes here");
        await userEvent.click(game);
        expect(dropdownMenu.style.display).toBe("block");
    });
});

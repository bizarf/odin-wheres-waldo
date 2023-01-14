import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";
import Game from "../src/components/Game";
import { describe, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Dropdown menu tests", () => {
    it("Dropdown menu opens when the user clicks", async () => {
        render(<Game />);
        const dropdownMenu = document.querySelector(".dropdownMenu");
        const game = screen.getByText("Home page goes here");
        await userEvent.click(game);
        expect(dropdownMenu.style.display).toBe("block");
    });
});

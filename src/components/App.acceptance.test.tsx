import React from "react";
import {render} from "@testing-library/react";
import App from "./App";
import GameEngine from "../core/game/GameEngine";
import userEvent from "@testing-library/user-event";
import Character from "../core/character/Character";
import WorldMap from "../core/map/WorldMap";
import Compass from "../core/orientation/Compass";

describe("Acceptance test", () => {
    it("should update the character state when command buttons are clicked ", () => {
        const gameEngine = new GameEngine(new WorldMap(), new Compass());
        const character = new Character("id-1");
        gameEngine.addCharacter(character);

        const app = render(<App gameEngine={gameEngine}/>);

        const moveButton = app.getByTestId("move-button");
        const leftButton = app.getByTestId("left-button");
        const rightButton = app.getByTestId("right-button");

        userEvent.click(moveButton);
        userEvent.click(rightButton);
        userEvent.click(rightButton);
        userEvent.click(leftButton);

        const characterInfo = app.getByTestId("character-info-id-1");
        expect(characterInfo).toHaveTextContent("id-1: EAST - 0 1");
    });
});
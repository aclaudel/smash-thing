import React from "react";
import {render} from "@testing-library/react";
import App from "./App";
import GameEngine from "../core/game/GameEngine";
import userEvent from "@testing-library/user-event";
import WorldMap from "../core/map/WorldMap";
import Compass from "../core/orientation/Compass";

describe("Acceptance test", () => {
    it("should update the character state when command buttons are clicked ", () => {
        const gameEngine = new GameEngine(new WorldMap(), new Compass());
        const id1 = "id-1";
        const id2 = "id-2";

        gameEngine.registerCharacter(id1);
        gameEngine.registerCharacter(id2);

        const app = render(<App gameEngine={gameEngine}/>);

        const leftButtonCharacter1 = app.getByTestId("left-button-" + id1);
        const moveButtonCharacter1 = app.getByTestId("move-button-" + id1);
        const rightButtonCharacter2 = app.getByTestId("right-button-"  + id2);

        userEvent.click(moveButtonCharacter1);
        userEvent.click(leftButtonCharacter1);
        userEvent.click(rightButtonCharacter2);

        const characterInfo1 = app.getByTestId("character-info-" + id1);
        expect(characterInfo1).toHaveTextContent(id1+ ": WEST - 0 1");

        const characterInfo2 = app.getByTestId("character-info-" + id2);
        expect(characterInfo2).toHaveTextContent(id2 + ": EAST - 0 0");
    });
});

import React from "react";
import {shallow} from "enzyme";
import App from "./App";
import CharacterState from "../core/character/CharacterState";
import {instance, mock, when} from "ts-mockito";
import GameView from "./game/GameView";
import Position from "../core/position/Position";
import Compass from "../core/orientation/Compass";

describe("App", () => {
    const positionDummy = instance(mock<Position>());
    const compassDummy = instance(mock<Compass>());
    const orientationDummy = "NORTH";

    const characterStateMock = mock<CharacterState>();
    const nextCharacterState = CharacterState.with(positionDummy, orientationDummy, compassDummy);

    it("should update the character state on move", () => {
        when(characterStateMock.move())
            .thenReturn(nextCharacterState);

        const app = shallow<App>(<App characterState={instance(characterStateMock)} />);

        app.instance().move();

        const gameView = app.find(GameView);
        expect(gameView.props().characterState).toBe(nextCharacterState);
    });
});
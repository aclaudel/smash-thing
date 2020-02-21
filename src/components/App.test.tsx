import React from "react";
import {mount, shallow} from "enzyme";
import App from "./App";
import CharacterState from "../core/character/CharacterState";
import {instance, mock, resetCalls, when} from "ts-mockito";
import GameView from "./game/GameView";
import Position from "../core/position/Position";
import Compass from "../core/orientation/Compass";
import WorldMap from "../core/position/WorldMap";

describe("App", () => {
    const positionDummy = instance(mock<Position>());
    const compassDummy = instance(mock<Compass>());
    const worldMapDummy = instance(mock<WorldMap>());
    const orientationDummy = "NORTH";

    const characterStateMock = mock<CharacterState>();
    const nextCharacterState = CharacterState.with(positionDummy, orientationDummy, compassDummy, worldMapDummy);

    beforeEach(() => {
        resetCalls(characterStateMock);
    });

    describe("unit state update", () => {
        it("should update the character state on move", () => {
            when(characterStateMock.move())
                .thenReturn(nextCharacterState);

            const app = shallow<App>(<App characterState={instance(characterStateMock)} />);

            app.instance().move();

            const gameView = app.find(GameView);
            expect(gameView.props().characterState).toBe(nextCharacterState);
        });

        it("should update the character state on left", () => {
            when(characterStateMock.left())
                .thenReturn(nextCharacterState);

            const app = shallow<App>(<App characterState={instance(characterStateMock)} />);

            app.instance().left();

            const gameView = app.find(GameView);
            expect(gameView.props().characterState).toBe(nextCharacterState);
        });

        it("should update the character state on right", () => {
            when(characterStateMock.right())
                .thenReturn(nextCharacterState);

            const app = shallow<App>(<App characterState={instance(characterStateMock)} />);

            app.instance().right();

            const gameView = app.find(GameView);
            expect(gameView.props().characterState).toBe(nextCharacterState);
        });
    });

    describe("full state update", () => {
        it("should update and display the new state", () => {
            when(characterStateMock.right())
                .thenReturn(nextCharacterState);

            const app = mount<App>(<App characterState={instance(characterStateMock)} />);
            const rightButton = app.find('[data-testid="right-button"]');

            console.log(app.debug());

            rightButton.simulate('click');

            const gameView = app.find(GameView);
            expect(gameView.props().characterState).toBe(nextCharacterState);
        });
    });

});
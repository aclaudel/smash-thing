import React from "react";
import {shallow} from "enzyme";
import App from "./App";
import {instance, mock, resetCalls, verify, when} from "ts-mockito";
import GameView from "./game/GameView";
import GameEngine from "../core/game/GameEngine";
import {CharacterInfo} from "../core/character/CharacterInfo";

describe("App", () => {
    const gameEngineMock = mock<GameEngine>();
    const nextCharacters: CharacterInfo[] = [];
    when(gameEngineMock.getCharacters()).thenReturn(nextCharacters);

    beforeEach(() => {
        resetCalls(gameEngineMock);
    });

    it("should update the state of the given character when moving", () => {
        const app = shallow<App>(<App gameEngine={instance(gameEngineMock)} />);

        app.instance().move("id-test");

        verify(gameEngineMock.moveCharacter("id-test")).called();
        const gameView = app.find(GameView);
        expect(gameView.props().characters).toBe(nextCharacters);
    });

    it("should update the state of the given character when turning left", () => {
        const app = shallow<App>(<App gameEngine={instance(gameEngineMock)} />);

        app.instance().left("id-test");

        verify(gameEngineMock.left("id-test")).called();
        const gameView = app.find(GameView);
        expect(gameView.props().characters).toBe(nextCharacters);
    });

    it("should update the state of the given character when turning right", () => {
        const app = shallow<App>(<App gameEngine={instance(gameEngineMock)} />);

        app.instance().right("id-test");

        verify(gameEngineMock.right("id-test")).called();
        const gameView = app.find(GameView);
        expect(gameView.props().characters).toBe(nextCharacters);
    });
});

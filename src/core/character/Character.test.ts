import Character from "./Character";
import {instance, mock, verify} from "ts-mockito";
import GameEngine from "../game/GameEngine";

describe("Character", () => {
    const id = "id-1";
    const gameEngineMock = mock<GameEngine>();
    const character = new Character(id, instance(gameEngineMock));

    describe("when moving", () => {
        character.move();
        it("should call the game engine using its ID", () => {
            verify(gameEngineMock.moveCharacter(id)).called();
        });
    });

    describe("when turning", () => {
        describe("left", () => {
            character.left();
            it("should call the game engine using its ID", () => {
                verify(gameEngineMock.left(id)).called();
            });
        });

        describe("right", () => {
            character.right();
            it("should call the game engine using its ID", () => {
                verify(gameEngineMock.right(id)).called();
            });
        });
    });
});
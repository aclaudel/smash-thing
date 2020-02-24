import GameEngine from "./GameEngine";
import Character from "../character/Character";
import WorldMap from "../map/WorldMap";
import {anyOfClass, instance, mock, when} from "ts-mockito";
import Position from "../map/Position";
import Compass from "../orientation/Compass";

const DEFAULT_ORIENTATION = "NORTH";
const DUMMY_POSITION = Position.of(1, 1);
const DUMMY_ORIENTATION = "SOUTH"; // be careful with false-positive as it will compare value and not reference
const DEFAULT_POSISTION_X = 0;
const DEFAULT_POSISTION_Y = 0;

describe("Game engine", () => {
    const worldMapMock = mock<WorldMap>();
    const compassMock = mock<Compass>();
    let character: Character;
    let gameEngine: GameEngine;

    beforeEach(() => {
        gameEngine = new GameEngine(instance(worldMapMock), instance(compassMock));
        character = new Character("id-1", gameEngine);
    });

    it("should register the character with a default state", () => {
        gameEngine.addCharacter(character);

        expect(gameEngine.getCharacters()).toHaveLength(1);
        const characterInfo = gameEngine.getCharacters()[0];
        expect(characterInfo.character).toBe(character);
        expect(characterInfo.state.orientation).toBe(DEFAULT_ORIENTATION);
        expect(characterInfo.state.position.x).toBe(DEFAULT_POSISTION_X);
        expect(characterInfo.state.position.y).toBe(DEFAULT_POSISTION_Y);
    });

    describe("with a registered character", () => {
        beforeEach(() => {
            gameEngine.addCharacter(character);
        });

        it("should move and update its state", () => {
            when(worldMapMock.move(anyOfClass(Position), DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_POSITION);

            gameEngine.moveCharacter(character.id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.position).toBe(DUMMY_POSITION);
        });

        it("should turn left and update its state", () => {
            when(compassMock.left(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);

            gameEngine.left(character.id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.orientation).toBe(DUMMY_ORIENTATION);
        });

        it("should turn right and update its state", () => {
            when(compassMock.right(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);

            gameEngine.right(character.id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.orientation).toBe(DUMMY_ORIENTATION);
        });
    });

    describe("with two characters", () => {
        it("should update only the character with the given id", () => {
            when(compassMock.right(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);


            const character1 = new Character("id-1", gameEngine);
            const character2 = new Character("id-2", gameEngine);

            gameEngine.addCharacter(character1);
            gameEngine.addCharacter(character2);

            gameEngine.right(character1.id);

            const characters = gameEngine.getCharacters();
            const character1Info = characters.find(c => c.character.id === "id-1");
            const character2Info = characters.find(c => c.character.id === "id-2");

            expect(character1Info?.state.orientation).toBe(DUMMY_ORIENTATION);
            expect(character2Info?.state.orientation).toBe(DEFAULT_ORIENTATION);
        });
    });
});

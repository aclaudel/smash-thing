import GameEngine from "./GameEngine";
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
    const id = "id";
    let gameEngine: GameEngine;

    beforeEach(() => {
        gameEngine = new GameEngine(instance(worldMapMock), instance(compassMock));
    });

    describe("with an unregistered character", () => {
        it("should register the character with a default state", () => {
            gameEngine.registerCharacter(id);

            expect(gameEngine.getCharacters()).toHaveLength(1);
            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.id).toBe(id);
            expect(characterInfo.orientation).toBe(DEFAULT_ORIENTATION);
            expect(characterInfo.position.x).toBe(DEFAULT_POSISTION_X);
            expect(characterInfo.position.y).toBe(DEFAULT_POSISTION_Y);
        });
    });

    describe("with a registered character", () => {
        beforeEach(() => {
            gameEngine.registerCharacter(id);
        });

        it("should move and update its state", () => {
            when(worldMapMock.move(anyOfClass(Position), DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_POSITION);

            gameEngine.moveCharacter(id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.position).toBe(DUMMY_POSITION);
        });

        it("should turn left and update its state", () => {
            when(compassMock.left(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);

            gameEngine.left(id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.orientation).toBe(DUMMY_ORIENTATION);
        });

        it("should turn right and update its state", () => {
            when(compassMock.right(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);

            gameEngine.right(id);

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.orientation).toBe(DUMMY_ORIENTATION);
        });
    });

    describe("with two registered characters", () => {
        it("should update only the character with the given id", () => {
            when(compassMock.right(DEFAULT_ORIENTATION))
                .thenReturn(DUMMY_ORIENTATION);


            const id1 = "id-1";
            const id2 = "id-2";

            gameEngine.registerCharacter(id1);
            gameEngine.registerCharacter(id2);

            gameEngine.right(id1);

            const characters = gameEngine.getCharacters();
            const character1Info = characters.find(c => c.id === id1);
            const character2Info = characters.find(c => c.id === id2);

            expect(character1Info?.orientation).toBe(DUMMY_ORIENTATION);
            expect(character2Info?.orientation).toBe(DEFAULT_ORIENTATION);
        });
    });
});

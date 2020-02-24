import GameEngine from "./GameEngine";
import Character from "../character/Character";

const DEFAULT_ORIENTATION = "NORTH";
const DEFAULT_POSISTION_X = 0;
const DEFAULT_POSISTION_Y = 0;

describe("Game engine", () => {
    let character: Character;
    let gameEngine: GameEngine;

    beforeEach(() => {
        gameEngine = new GameEngine();
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
            character.move();

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.position.y).toBe(DEFAULT_POSISTION_Y +1);
        });

        it("should turn left and update its state", () => {
            character.left();

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.orientation).toBe("WEST");
        });

        it("should turn right and update its state", () => {
            character.right();

            const characterInfo = gameEngine.getCharacters()[0];
            expect(characterInfo.state.orientation).toBe("EAST");
        });
    });

    describe("with two characters", () => {
        it("should update only the character with the given id", () => {
            const character1 = new Character("id-1", gameEngine);
            const character2 = new Character("id-2", gameEngine);

            gameEngine.addCharacter(character1);
            gameEngine.addCharacter(character2);

            character1.right();

            const characters = gameEngine.getCharacters();
            const character1Info = characters.find(c => c.character.id === "id-1");
            const character2Info = characters.find(c => c.character.id === "id-2");

            expect(character1Info?.state.orientation).toBe("EAST");
            expect(character2Info?.state.orientation).toBe(DEFAULT_ORIENTATION);
        });
    });
});
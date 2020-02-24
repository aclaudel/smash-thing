import GameEngine from "./GameEngine";
import Character from "../character/Character";

describe("Game engine", () => {
    const gameEngine = new GameEngine();

    it("should register the character with a default state", () => {
        const character = new Character("id-1", gameEngine);

        gameEngine.addCharacter(character);

        expect(gameEngine.getCharacters()).toHaveLength(1);
        const characterInfo = gameEngine.getCharacters()[0];
        expect(characterInfo.character).toBe(character);
        expect(characterInfo.state.orientation).toBe("NORTH");
        expect(characterInfo.state.position.x).toBe(0);
        expect(characterInfo.state.position.y).toBe(0);
    });
});
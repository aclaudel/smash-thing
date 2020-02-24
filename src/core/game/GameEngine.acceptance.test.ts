import GameEngine from "./GameEngine";
import Character from "../character/Character";

describe("Game engine", () => {
    const engine = new GameEngine();

    it("should register and update the character state", () => {
        const id = "id-1";

        engine.addCharacter(new Character(id, engine));
        engine.moveCharacter(id);
        engine.right(id);
        engine.right(id);
        engine.left(id);

        const currentCharacter = engine.getCharacters()
            .find(c => c.character.id === id);

        expect(currentCharacter).not.toBeFalsy();
        expect(currentCharacter?.state.position.y).toBe(1);
        expect(currentCharacter?.state.position.x).toBe(0);
        expect(currentCharacter?.state.orientation).toBe("EAST");
    });
});

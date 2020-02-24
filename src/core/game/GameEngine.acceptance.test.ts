import GameEngine from "./GameEngine";
import Compass from "../orientation/Compass";
import WorldMap from "../map/WorldMap";

describe("Game engine", () => {
    const engine = new GameEngine(new WorldMap(), new Compass());

    it("should register and update the character state", () => {
        const id = "id-1";

        engine.registerCharacter(id);
        engine.moveCharacter(id);
        engine.right(id);
        engine.right(id);
        engine.left(id);

        const currentCharacter = engine.getCharacters()
            .find(c => c.id === id);

        expect(currentCharacter).not.toBeFalsy();
        expect(currentCharacter?.state.position.y).toBe(1);
        expect(currentCharacter?.state.position.x).toBe(0);
        expect(currentCharacter?.state.orientation).toBe("EAST");
    });
});

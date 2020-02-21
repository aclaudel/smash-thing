import Position from "../position/Position";
import CharacterState from "./CharacterState";

describe("Character", () => {
    it("should move up if facing north", () => {
        const initPosition = Position.of(1,1);
        const initOrientation = "NORTH";

        const characterState = CharacterState.at(initPosition, initOrientation);

        expect(characterState.move().position.y).toBe(initPosition.y +1);
    });
});

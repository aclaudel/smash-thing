import Position from "../position/Position";
import CharacterState from "./CharacterState";

describe("Character", () => {
    const initPosition = Position.of(1,1);

    describe("when facing North", () => {
        const initOrientation = "NORTH";
        const characterState = CharacterState.at(initPosition, initOrientation);
        const nextCharacterState = characterState.move();

        it("should move up", () => {
            expect(nextCharacterState.position.y).toBe(initPosition.y +1);
        });

    });
});

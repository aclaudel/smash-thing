import Position from "../position/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, verify, when} from "ts-mockito";
import {Orientation} from "../orientation/Orientation";

describe("Character move", () => {
    const positionMock = mock<Position>();
    const nextPosition: Position = Position.of(0,0); // could be any

    beforeEach(() => {
        resetCalls(positionMock);
    });

    describe("when facing North", () => {
        const initOrientation = "NORTH";
        const characterState = makeCharacterState(positionMock, initOrientation);

        when(positionMock.transY(1))
            .thenReturn(nextPosition);

        it("should move up", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transY(1)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });

    describe("when facing West", () => {
        const initOrientation = "WEST";
        const characterState = makeCharacterState(positionMock, initOrientation);

        when(positionMock.transX(-1))
            .thenReturn(nextPosition);

        it("should move left", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transX(-1)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });
});

function makeCharacterState(positionMock: Position, initOrientation: Orientation) {
    return CharacterState.at(instance(positionMock), initOrientation);
}

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
        const expectedYModifier = 1;
        when(positionMock.transY(expectedYModifier))
            .thenReturn(nextPosition);

        it("should move up", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transY(expectedYModifier)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });

    describe("when facing West", () => {
        const initOrientation = "WEST";
        const characterState = makeCharacterState(positionMock, initOrientation);
        const expectedXModifier = -1;
        when(positionMock.transX(expectedXModifier))
            .thenReturn(nextPosition);

        it("should move left", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transX(expectedXModifier)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });

    describe("when facing East", () => {
        const initOrientation = "EAST";
        const characterState = makeCharacterState(positionMock, initOrientation);
        const expectedXModifier = 1;
        when(positionMock.transX(expectedXModifier))
            .thenReturn(nextPosition);

        it("should move right", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transX(expectedXModifier)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });

    describe("when facing South", () => {
        const initOrientation = "SOUTH";
        const characterState = makeCharacterState(positionMock, initOrientation);
        const expectedYModifier = -1;

        when(positionMock.transY(expectedYModifier))
            .thenReturn(nextPosition);

        it("should move down", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transY(expectedYModifier)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });
});

function makeCharacterState(positionMock: Position, initOrientation: Orientation) {
    return CharacterState.at(instance(positionMock), initOrientation);
}

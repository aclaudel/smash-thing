import Position from "../position/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, verify, when} from "ts-mockito";

describe("Character", () => {
    const positionMock = mock<Position>();
    const nextPosition: Position = Position.of(0,0); // could be any

    beforeEach(() => {
        resetCalls(positionMock);
    });

    describe("when facing North", () => {
        const initOrientation = "NORTH";
        const characterState = CharacterState.at(instance(positionMock), initOrientation);

        when(positionMock.transY(1))
            .thenReturn(nextPosition);

        it("should move up", () => {
            const nextCharacterState = characterState.move();
            verify(positionMock.transY(1)).called();
            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });
});

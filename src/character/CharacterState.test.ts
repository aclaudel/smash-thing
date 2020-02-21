import Position from "../position/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, when} from "ts-mockito";
import {Orientation} from "../orientation/Orientation";

describe("Character", () => {

    describe("Character move", () => {
        const positionMock = mock<Position>();
        const nextPosition: Position = Position.of(0, 0); // could be any

        beforeEach(() => {
            resetCalls(positionMock);
        });

        it("should move up when facing North", () => {
            const characterState = makeCharacterState(positionMock, "NORTH");
            when(positionMock.transY(1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        function makeCharacterState(positionMock: Position, initOrientation: Orientation) {
            return CharacterState.with(instance(positionMock), initOrientation);
        }

        function moveAndExpectPositionToBeUpdated(characterState: CharacterState) {
            const nextCharacterState = characterState.move();
            expect(nextCharacterState.position).toBe(nextPosition);
        }

        it("should move left when facing West", () => {
            const characterState = makeCharacterState(positionMock, "WEST");
            when(positionMock.transX(-1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        it("should move right when facing East", () => {
            const characterState = makeCharacterState(positionMock, "EAST");
            when(positionMock.transX(1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        it("should move down when facing South", () => {
            const characterState = makeCharacterState(positionMock, "SOUTH");
            when(positionMock.transY(-1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });
    });
});

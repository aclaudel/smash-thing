import Position from "../position/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, when} from "ts-mockito";
import {Orientation} from "../orientation/Orientation";
import Compass from "../orientation/Compass";

describe("Character", () => {
    const positionMock = mock<Position>();
    const compassMock = mock<Compass>();

    beforeEach(() => {
        resetCalls(positionMock);
    });


    describe("when moving", () => {

        const nextPosition: Position = Position.of(0, 0); // could be any
        it("should move up when facing North", () => {
            const characterState = makeCharacterStateWithOrientation("NORTH");
            when(positionMock.transY(1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        function makeCharacterStateWithOrientation(initOrientation: Orientation) {
            return CharacterState.with(instance(positionMock), initOrientation, instance(compassMock));
        }

        function moveAndExpectPositionToBeUpdated(characterState: CharacterState) {
            const nextCharacterState = characterState.move();
            expect(nextCharacterState.position).toBe(nextPosition);
        }

        it("should move left when facing West", () => {
            const characterState = makeCharacterStateWithOrientation("WEST");
            when(positionMock.transX(-1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        it("should move right when facing East", () => {
            const characterState = makeCharacterStateWithOrientation("EAST");
            when(positionMock.transX(1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });

        it("should move down when facing South", () => {
            const characterState = makeCharacterStateWithOrientation("SOUTH");
            when(positionMock.transY(-1))
                .thenReturn(nextPosition);
            moveAndExpectPositionToBeUpdated(characterState);
        });
    });

    describe("when turning", () => {
        const orientation = "NORTH";
        const nextOrientation = "SOUTH";
        const characterState = CharacterState.with(instance(positionMock), orientation, instance(compassMock));

        it("should update the orientation when turning left", () => {
            when(compassMock.left(orientation))
                .thenReturn(nextOrientation);
            const nextCharacterState = characterState.left();
            expect(nextCharacterState.orientation).toBe(nextOrientation);
        });

        it("should update the orientation when turning right", () => {
            when(compassMock.right(orientation))
                .thenReturn(nextOrientation);
            const nextCharacterState = characterState.right();
            expect(nextCharacterState.orientation).toBe(nextOrientation);
        });
    });
});

import Position from "../map/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, when} from "ts-mockito";
import Compass from "../orientation/Compass";
import WorldMap from "../map/WorldMap";

describe("Character", () => {
    const positionMock = mock<Position>();
    const compassMock = mock<Compass>();
    const worldMapMock = mock<WorldMap>();

    beforeEach(() => {
        resetCalls(positionMock);
    });


    describe("when moving", () => {
        it("should call use the map", () => {
            const orientation = "NORTH";
            const position = Position.of(1, 1);
            const nextPosition = Position.of(2, 2);

            when(worldMapMock.move(position, orientation))
                .thenReturn(nextPosition);

            const characterState = CharacterState.with(
               position, orientation,
               instance(compassMock), instance(worldMapMock));

            const nextCharacterState = characterState.move();

            expect(nextCharacterState.position).toBe(nextPosition);
        });
    });

    describe("when turning", () => {
        const orientation = "NORTH";
        const nextOrientation = "SOUTH";
        const characterState = CharacterState.with(
            instance(positionMock), orientation,
            instance(compassMock), instance(worldMapMock));

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

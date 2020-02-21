import Position from "./Position";
import {instance, mock, when} from "ts-mockito";
import WorldMap from "./WorldMap";
import {Orientation} from "../orientation/Orientation";

describe("WorldMap", () => {
    const map = new WorldMap();
    const positionMock = mock<Position>();
    const nextPosition: Position = Position.of(0, 0); // could be any

    it("should move up when facing NORTH", () => {
        when(positionMock.transY(1))
            .thenReturn(nextPosition);

        moveAndExpectPositionToBeUpdated("NORTH");
    });

    function moveAndExpectPositionToBeUpdated(orientation: Orientation) {
        const actualNextPosition = map.move(instance(positionMock), orientation);
        expect(actualNextPosition).toBe(nextPosition);
    }

    it("should move up when facing WEST", () => {
        when(positionMock.transX(-1))
            .thenReturn(nextPosition);

        moveAndExpectPositionToBeUpdated("WEST");
    });

    it("should move up when facing EAST", () => {
        when(positionMock.transX(1))
            .thenReturn(nextPosition);

        moveAndExpectPositionToBeUpdated("EAST");
    });

    it("should move up when facing SOUTH", () => {
        when(positionMock.transY(-1))
            .thenReturn(nextPosition);

        moveAndExpectPositionToBeUpdated("SOUTH");
    });

});
import Position from "../position/Position";
import CharacterState from "./CharacterState";
import {instance, mock, resetCalls, verify} from "ts-mockito";

describe("Character", () => {
    const positionMock = mock<Position>();

    beforeEach(() => {
        resetCalls(positionMock);
    });

    describe("when facing North", () => {
        const initOrientation = "NORTH";
        const characterState = CharacterState.at(instance(positionMock), initOrientation);


        it("should move up", () => {
            characterState.move();
            verify(positionMock.transY(1)).called();
        });
    });
});

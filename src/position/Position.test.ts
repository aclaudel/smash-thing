import Position from "./Position";

describe("Position", () => {
    it("should translate Y by the given value", () => {
        let newPosition;

        newPosition = Position.of(1,1).transY(1);
        expect(newPosition.y).toBe(2);

        newPosition = Position.of(1,1).transY(-1);
        expect(newPosition.y).toBe(0);

        newPosition = Position.of(1,1).transY(4);
        expect(newPosition.y).toBe(5);
    });

    it("should translate X by the given value", () => {
        let newPosition;

        newPosition = Position.of(1,1).transX(1);
        expect(newPosition.x).toBe(2);

        newPosition = Position.of(1,1).transX(-1);
        expect(newPosition.x).toBe(0);

        newPosition = Position.of(1,1).transX(4);
        expect(newPosition.x).toBe(5);
    });

    it("should translate X and Y by the given values", () => {
        let newPosition;

        newPosition = Position.of(1,1).trans(1, 1);
        expect(newPosition.x).toBe(2);
        expect(newPosition.y).toBe(2);

        newPosition = Position.of(1,1).trans(-1, 1);
        expect(newPosition.x).toBe(0);
        expect(newPosition.y).toBe(2);

        newPosition = Position.of(1,1).trans(3, 3);
        expect(newPosition.x).toBe(4);
        expect(newPosition.y).toBe(4);
    });
});

import Position from "./Position";

describe("Position", () => {
    it("should translate Y by the given value", () => {
        const test = (yModifier: number, expectedY: number) => {
            const newPosition = Position.of(1,1).transY(yModifier);
            expect(newPosition.y).toBe(expectedY);
        };

        test(1, 2);
        test(-1, 0);
        test(4, 5);
    });

    it("should translate X by the given value", () => {
        const test = (xModifier: number, expectedX: number) => {
            const newPosition = Position.of(1,1).transX(xModifier);
            expect(newPosition.x).toBe(expectedX);
        };

        test(1, 2);
        test(-1, 0);
        test(4, 5);
    });

    it("should translate X and Y by the given values", () => {
        const test = (xModifier: number, yModifier: number,
                      expectedX: number, expectedY: number) => {
            const newPosition = Position.of(1,1)
                .trans(xModifier, yModifier);
            expect(newPosition.x).toBe(expectedX);
            expect(newPosition.y).toBe(expectedY);
        };

        test(1, 1, 2, 2);
        test(-1, 1, 0, 2);
        test(2, 2, 3, 3);
        test(0, 1, 1, 2);
    });
});

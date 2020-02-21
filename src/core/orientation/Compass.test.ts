import Compass from "./Compass";

describe("Compass", () => {
    const service = new Compass();

    it("should return the left orientation", () => {
        expect(service.left("NORTH")).toBe("WEST");
        expect(service.left("WEST")).toBe("SOUTH");
        expect(service.left("SOUTH")).toBe("EAST");
        expect(service.left("EAST")).toBe("NORTH");
    });

    it("should return the right orientation", () => {
        expect(service.right("NORTH")).toBe("EAST");
        expect(service.right("EAST")).toBe("SOUTH");
        expect(service.right("SOUTH")).toBe("WEST");
        expect(service.right("WEST")).toBe("NORTH");
    });
});
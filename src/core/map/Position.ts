export default class Position {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static of(x: number, y: number): Position {
        return new Position(x, y);
    }

    trans(xModifier: number, yModifier: number): any {
        return Position.of(this.x + xModifier, this.y + yModifier);
    }

    transY(yModifier: number): Position {
        return Position.of(this.x, this.y + yModifier);
    }

    transX(xModifier: number): any {
        return Position.of(this.x + xModifier, this.y);
    }

}

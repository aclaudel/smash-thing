import {Orientation} from "../orientation/Orientation";
import Position from "../map/Position";

export default class Character {
    readonly id: string;
    readonly position: Position;
    readonly orientation: Orientation;

    private constructor(id: string, position: Position, orientation: Orientation) {
        this.id = id;
        this.position = position;
        this.orientation = orientation;
    }

    static init(id: string, position: Position, orientation: Orientation) {
        return new Character(id, position, orientation);
    }

    at(position: Position): Character {
        return Character.init(this.id, position, this.orientation);
    }

    facedTo(orientation: Orientation): Character {
        return Character.init(this.id, this.position, orientation);
    }
}

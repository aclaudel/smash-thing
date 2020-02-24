import {Orientation} from "../orientation/Orientation";
import Position from "../map/Position";

export default class CharacterState {
    readonly position: Position;
    readonly orientation: Orientation;

    private constructor(position: Position, orientation: Orientation) {
        this.position = position;
        this.orientation = orientation;
    }

    static init(position: Position, orientation: Orientation) {
        return new CharacterState(position, orientation);
    }

    at(position: Position): CharacterState {
        return CharacterState.init(position, this.orientation);
    }

    facedTo(orientation: Orientation): CharacterState {
        return CharacterState.init(this.position, orientation);
    }
}

import {Orientation} from "../orientation/Orientation";
import Position from "../position/Position";

export default class CharacterState {
    readonly position: Position;
    readonly orientation: Orientation;

    private constructor(position: Position, orientation: Orientation) {
        this.position = position;
        this.orientation = orientation;
    }

    static at(position: Position, orientation: Orientation) {
        return new CharacterState(position, orientation);
    }

    move(): CharacterState {
        return CharacterState.at(this.position.transY(1), this.orientation);
    }
}

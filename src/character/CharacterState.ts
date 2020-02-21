import {Orientation} from "../orientation/Orientation";
import Position from "../position/Position";

export default class CharacterState {
    readonly position: Position;
    readonly orientation: Orientation;

    private constructor(position: Position, orientation: Orientation) {
        this.position = position;
        this.orientation = orientation;
    }

    static with(position: Position, orientation: Orientation) {
        return new CharacterState(position, orientation);
    }

    move(): CharacterState {
        switch (this.orientation) {
            case "WEST": return CharacterState.with(this.position.transX(-1), this.orientation);
            case "EAST": return CharacterState.with(this.position.transX(1), this.orientation);
            case "SOUTH": return CharacterState.with(this.position.transY(-1), this.orientation);
            case "NORTH": return CharacterState.with(this.position.transY(1), this.orientation);
        }
    }
}

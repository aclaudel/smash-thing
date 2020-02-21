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

    private at(position: Position): CharacterState {
        return CharacterState.with(position, this.orientation);
    }

    move(): CharacterState {
        switch (this.orientation) {
            case "WEST": return this.at(this.position.transX(-1));
            case "EAST": return this.at(this.position.transX(1));
            case "SOUTH": return this.at(this.position.transY(-1));
            case "NORTH": return this.at(this.position.transY(1));
        }
    }
}

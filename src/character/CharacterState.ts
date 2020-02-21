import {Orientation} from "../orientation/Orientation";
import Position from "../position/Position";
import Compass from "../orientation/Compass";

export default class CharacterState {
    readonly position: Position;
    readonly orientation: Orientation;
    private readonly compass: Compass;

    constructor(position: Position, orientation: Orientation, compass: Compass) {
        this.position = position;
        this.orientation = orientation;
        this.compass = compass;
    }

    static with(position: Position, orientation: Orientation, compass: Compass) {
        return new CharacterState(position, orientation, compass);
    }

    private at(position: Position): CharacterState {
        return CharacterState.with(position, this.orientation, this.compass);
    }

    private facedTo(orientation: Orientation): CharacterState {
        return CharacterState.with(this.position, orientation, this.compass);
    }

    move(): CharacterState {
        switch (this.orientation) {
            case "WEST": return this.at(this.position.transX(-1));
            case "EAST": return this.at(this.position.transX(1));
            case "SOUTH": return this.at(this.position.transY(-1));
            case "NORTH": return this.at(this.position.transY(1));
        }
    }

    left(): CharacterState {
        return this.facedTo(this.compass.left(this.orientation));
    }
}

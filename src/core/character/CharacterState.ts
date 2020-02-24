import {Orientation} from "../orientation/Orientation";
import Position from "../map/Position";
import Compass from "../orientation/Compass";
import WorldMap from "../map/WorldMap";

export default class CharacterState {
    readonly position: Position;
    readonly orientation: Orientation;
    private readonly compass: Compass;
    private readonly worldMap: WorldMap;

    private constructor(position: Position, orientation: Orientation, compass: Compass, worldMap: WorldMap) {
        this.position = position;
        this.orientation = orientation;
        this.compass = compass;
        this.worldMap = worldMap;
    }

    static with(position: Position, orientation: Orientation, compass: Compass, worldMap: WorldMap) {
        return new CharacterState(position, orientation, compass, worldMap);
    }

    at(position: Position): CharacterState {
        return CharacterState.with(position, this.orientation, this.compass, this.worldMap);
    }

    private facedTo(orientation: Orientation): CharacterState {
        return CharacterState.with(this.position, orientation, this.compass, this.worldMap);
    }

    move(): CharacterState {
        return this.at(this.worldMap.move(this.position, this.orientation));
    }

    left(): CharacterState {
        return this.facedTo(this.compass.left(this.orientation));
    }

    right(): CharacterState {
        return this.facedTo(this.compass.right(this.orientation));
    }
}

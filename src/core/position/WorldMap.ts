import {Orientation} from "../orientation/Orientation";
import Position from "./Position";

export default class WorldMap {

    move(position: Position, orientation: Orientation): Position {
        switch (orientation) {
            case "NORTH": return position.transY(1);
            case "WEST": return position.transX(-1);
            case "EAST": return position.transX(1);
            case "SOUTH": return position.transY(-1);
        }
    }
}
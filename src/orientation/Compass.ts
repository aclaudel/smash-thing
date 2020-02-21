import {Orientation} from "./Orientation";

export default class Compass {

    left(orientation: Orientation) {
        switch (orientation) {
            case "NORTH": return "WEST";
            case "WEST": return "SOUTH";
            case "SOUTH": return "EAST";
            case "EAST": return "NORTH";
        }
    }

    right(orientation: Orientation) {
        switch (orientation) {
            case "NORTH": return "EAST";
            case "EAST": return "SOUTH";
            case "SOUTH": return "WEST";
            case "WEST": return "NORTH";
        }
    }
}

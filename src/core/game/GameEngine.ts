import Character from "../character/Character";
import Position from "../map/Position";
import WorldMap from "../map/WorldMap";
import Compass from "../orientation/Compass";
import {CharacterInfo} from "../character/CharacterInfo";

export default class GameEngine {
    private readonly worldMap: WorldMap;
    private readonly compass: Compass;

    constructor(worldMap: WorldMap, compass: Compass) {
        this.worldMap = worldMap;
        this.compass = compass;
    }

    // index this with a map<id, ..> if performance issue because of '.find()'
    private readonly characters: CharacterInfo[] = [];

    moveCharacter(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        const nextPosition = this.worldMap.move(
            characterInfo.position,
            characterInfo.orientation
        );
        characterInfo.position = nextPosition;
    }

    private getCharacterInfo(id: string) {
        const characterInfo = this.characters
            .find(character => character.id === id);
        if(characterInfo) {
            return characterInfo;
        }
        throw new Error(`unknown character with id [${id}]`);
    }

    left(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        const nextOrientation = this.compass.left(characterInfo.orientation);
        characterInfo.orientation = nextOrientation;
    }

    right(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        const nextOrientation = this.compass.right(characterInfo.orientation);
        characterInfo.orientation = nextOrientation;
    }

    registerCharacter(id: string) {
        const character = GameEngine.defaultCharacterState(id);
        let characterInfo: CharacterInfo = {
            ...character
        };
        this.characters.push(characterInfo);
    }

    private static defaultCharacterState(id: string): Character {
        return Character.init(id, Position.of(0,0), "NORTH");
    }

    getCharacters(): CharacterInfo[] {
        return this.characters.slice();
    }
}
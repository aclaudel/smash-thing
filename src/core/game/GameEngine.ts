import Character from "../character/Character";
import Position from "../map/Position";
import WorldMap from "../map/WorldMap";
import Compass from "../orientation/Compass";
import {CharacterInfo} from "../character/CharacterInfo";

export default class GameEngine {
    private readonly worldMap: WorldMap;
    private readonly compass: Compass;
    private readonly charactersMap: Map<string, Character>;

    constructor(worldMap: WorldMap, compass: Compass) {
        this.worldMap = worldMap;
        this.compass = compass;
        this.charactersMap = new Map();
    }

    registerCharacter(id: string) {
        const character = GameEngine.characterWithDefaultState(id);
        this.charactersMap.set(character.id, character);
    }

    private static characterWithDefaultState(id: string): Character {
        return Character.init(id, Position.of(0,0), "NORTH");
    }

    getCharacters(): CharacterInfo[] {
        return Array.from(this.charactersMap.values());
    }

    moveCharacter(id: string) {
        const character = this.getCharacter(id);
        const nextPosition = this.worldMap.move(character.position, character.orientation);
        this.charactersMap.set(id, character.at(nextPosition));
    }

    private getCharacter(id: string) {
        const characterInfo = this.charactersMap.get(id);
        if(characterInfo) {
            return characterInfo;
        }
        throw new Error(`unknown character with id [${id}]`);
    }

    left(id: string) {
        const character = this.getCharacter(id);
        const nextOrientation = this.compass.left(character.orientation);
        this.charactersMap.set(id, character.facedTo(nextOrientation));
    }

    right(id: string) {
        const character = this.getCharacter(id);
        const nextOrientation = this.compass.right(character.orientation);
        this.charactersMap.set(id, character.facedTo(nextOrientation));
    }
}
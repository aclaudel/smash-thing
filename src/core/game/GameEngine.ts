import CharacterState from "../character/CharacterState";
import Position from "../map/Position";
import WorldMap from "../map/WorldMap";
import Compass from "../orientation/Compass";

export type CharacterInfo = {
    id: string,
    state: CharacterState
};

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
            characterInfo.state.position,
            characterInfo.state.orientation
        );
        characterInfo.state = characterInfo.state.at(nextPosition);
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
        const nextOrientation = this.compass.left(characterInfo.state.orientation);
        characterInfo.state = characterInfo.state.facedTo(nextOrientation);
    }

    right(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        const nextOrientation = this.compass.right(characterInfo.state.orientation);
        characterInfo.state = characterInfo.state.facedTo(nextOrientation);
    }

    registerCharacter(id: string) {
        let characterInfo = {
            id: id,
            state: GameEngine.newDefaultState()
        };
        this.characters.push(characterInfo);
    }

    private static newDefaultState(): CharacterState {
        return CharacterState.init(Position.of(0,0), "NORTH");
    }

    getCharacters(): CharacterInfo[] {
        return this.characters.slice();
    }
}
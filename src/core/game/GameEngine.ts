import Character from "../character/Character";
import CharacterState from "../character/CharacterState";
import Position from "../map/Position";
import WorldMap from "../map/WorldMap";
import Compass from "../orientation/Compass";

export type CharacterInfo = {
    character: Character,
    state: CharacterState
};

export default class GameEngine {
    private readonly worldMap?: WorldMap;
    private readonly compass?: Compass;

    constructor(worldMap?: WorldMap, compass?: Compass) {
        this.worldMap = worldMap;
        this.compass = compass;
    }

    // index this with a map<id, ..> if performance issue because of '.find()'
    private readonly characters: CharacterInfo[] = [];

    moveCharacter(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        if(!this.worldMap) {
            characterInfo.state = characterInfo.state.move();
        } else {
            const nextPosition = this.worldMap.move(
                characterInfo.state.position,
                characterInfo.state.orientation
            );
            characterInfo.state = characterInfo.state.at(nextPosition);
        }
    }

    private getCharacterInfo(id: string) {
        const characterInfo = this.characters
            .find(character => character.character.id === id);
        if(characterInfo) {
            return characterInfo;
        }
        throw new Error(`unknown character with id [${id}]`);
    }

    left(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        if(!this.compass) {
            characterInfo.state = characterInfo.state.left();
        } else {
            const nextOrientation = this.compass.left(characterInfo.state.orientation);
            characterInfo.state = characterInfo.state.facedTo(nextOrientation);
        }
    }

    right(id: string) {
        const characterInfo = this.getCharacterInfo(id);
        characterInfo.state = characterInfo.state.right();
    }

    addCharacter(character: Character) {
        let characterInfo = {
            character: character,
            state: GameEngine.newDefaultState()
        };
        this.characters.push(characterInfo);
    }

    private static newDefaultState(): CharacterState {
        return CharacterState.with(
            Position.of(0,0), "NORTH",
            new Compass(), new WorldMap()
        );
    }

    getCharacters(): CharacterInfo[] {
        return this.characters.slice();
    }
}
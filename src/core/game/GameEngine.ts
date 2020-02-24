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
    private readonly characters: CharacterInfo[] = [];

    moveCharacter(id: string) {
        throw new Error();
    }

    left(id: string) {
        throw new Error();
    }

    right(id: string) {
        throw new Error();
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
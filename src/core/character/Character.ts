import GameEngine from "../game/GameEngine";

export default class Character {
    readonly id: string;

    constructor(id: string, gameEngine: GameEngine) {
        this.id = id;
    }
}

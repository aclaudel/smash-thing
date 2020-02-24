import GameEngine from "../game/GameEngine";

export default class Character {
    private readonly id: string;
    private readonly gameEngine: GameEngine;

    constructor(id: string, gameEngine: GameEngine) {
        this.id = id;
        this.gameEngine = gameEngine;
    }

    move() {
        this.gameEngine.moveCharacter(this.id);
    }

    left() {
        this.gameEngine.left(this.id);
    }

    right() {
        this.gameEngine.right(this.id);
    }
}

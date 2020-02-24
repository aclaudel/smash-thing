import React from "react";
import CharacterState from "../core/character/CharacterState";
import GameView from "./game/GameView";
import {Listeners} from "./game/Commands";
import GameEngine, {CharacterInfo} from "../core/game/GameEngine";

type AppProps = {
    characterState: CharacterState,
    gameEngine: GameEngine
}

type AppState = {
    characterState: CharacterState,
    characters: CharacterInfo[]
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.move = this.move.bind(this);
        this.state = {
            characterState: props.characterState,
            characters: props.gameEngine.getCharacters()
        }
    }
    move() {
        const nextCharacterState = this.state.characterState.move();
        this.props.gameEngine.moveCharacter("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characterState: nextCharacterState, characters: nextCharacters});
    }

    left() {
        const nextCharacterState = this.state.characterState.left();
        this.props.gameEngine.left("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characterState: nextCharacterState, characters: nextCharacters});
    }

    right() {
        const nextCharacterState = this.state.characterState.right();
        this.props.gameEngine.right("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characterState: nextCharacterState, characters: nextCharacters});
    }

    render() {
        const listeners: Listeners = {
            left: this.left,
            move: this.move,
            right: this.right
        };

        return (
            <div>
                <h1>Smash things</h1>
                <GameView
                    characterState={this.state.characterState}
                    listeners={listeners}
                />
                {this.state.characters.map(c =>
                    <h2>{c.character.id}: {c.state.orientation} - {c.state.position.x} {c.state.position.y}</h2>
                )}
            </div>
        );
    }
}
import React from "react";
import GameView from "./game/GameView";
import {Listeners} from "./game/Commands";
import GameEngine, {CharacterInfo} from "../core/game/GameEngine";

type AppProps = {
    gameEngine: GameEngine
}

type AppState = {
    characters: CharacterInfo[]
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.move = this.move.bind(this);
        this.state = {
            characters: props.gameEngine.getCharacters()
        }
    }
    move() {
        this.props.gameEngine.moveCharacter("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characters: nextCharacters});
    }

    left() {
        this.props.gameEngine.left("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characters: nextCharacters});
    }

    right() {
        this.props.gameEngine.right("id-1");
        const nextCharacters = this.props.gameEngine.getCharacters();
        this.setState({characters: nextCharacters});
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
                    characters={this.state.characters}
                    listeners={listeners}
                />
            </div>
        );
    }
}
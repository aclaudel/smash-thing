import React from "react";
import CharacterState from "../core/character/CharacterState";
import GameView from "./game/GameView";
import {Listeners} from "./game/Commands";

type AppProps = {
    characterState: CharacterState
}

type AppState = {
    characterState: CharacterState
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.right = this.right.bind(this);
        this.left = this.left.bind(this);
        this.move = this.move.bind(this);
        this.state = {
            characterState: props.characterState
        }
    }
    move() {
        const nextCharacterState = this.state.characterState.move();
        this.setState({characterState: nextCharacterState});
    }

    left() {
        const nextCharacterState = this.state.characterState.left();
        this.setState({characterState: nextCharacterState});
    }

    right() {
        const nextCharacterState = this.state.characterState.right();
        this.setState({characterState: nextCharacterState});
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
            </div>
        );
    }
}
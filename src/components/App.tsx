import React from "react";
import CharacterState from "../core/character/CharacterState";
import GameView from "./game/GameView";

type AppProps = {
    characterState: CharacterState
}

type AppState = {
    characterState: CharacterState
}

export default class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            characterState: props.characterState
        }
    }

    move() {
        const nextCharacterState = this.state.characterState.move();
        this.setState({characterState: nextCharacterState});
    }

    render() {
        return (
            <div>
                <h1>Smash things</h1>
                <GameView characterState={this.state.characterState}/>
            </div>
        );
    }
}
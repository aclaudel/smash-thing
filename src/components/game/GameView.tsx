import React from "react";
import CharacterState from "../../core/character/CharacterState";
import Commands, {Listeners} from "./Commands";

export default function GameView(props: {
    characterState: CharacterState,
    listeners: Listeners
}) {
    return (
        <div data-testid="game-view">
            <Commands listeners={props.listeners}/>
            <h1>{props.characterState.orientation} - {props.characterState.position.x} {props.characterState.position.y}</h1>
        </div>
    );
}
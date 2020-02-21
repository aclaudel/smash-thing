import React from "react";
import CharacterState from "../../core/character/CharacterState";

export default function GameView(props: { characterState: CharacterState }) {
    return (
        <div data-testid="game-view"/>
    );
}
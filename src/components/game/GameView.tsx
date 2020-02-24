import React from "react";
import Commands, {Listeners} from "./Commands";
import {CharacterInfo} from "../../core/game/GameEngine";

export default function GameView(props: {
    characters: CharacterInfo[],
    listeners: Listeners
}) {
    return (
        <div data-testid="game-view">
            <Commands listeners={props.listeners}/>
            {props.characters.map(c =>
                <h2 key={c.id} data-testid={"character-info-" + c.id}>
                    {c.id}: {c.orientation} - {c.position.x} {c.position.y}
                </h2>
            )}
        </div>
    );
}

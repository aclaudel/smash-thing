import React from "react";
import Commands, {Listeners} from "./Commands";
import {CharacterInfo} from "../../core/character/CharacterInfo";

export default function GameView(props: {
    characters: CharacterInfo[],
    listeners: Listeners
}) {
    return (
        <div data-testid="game-view">
            {props.characters.map(c =>
                <div key={c.id} >
                    <Commands characterId={c.id} listeners={props.listeners}/>
                    <h2 data-testid={"character-info-" + c.id}>
                        {c.id}: {c.orientation} - {c.position.x} {c.position.y}
                    </h2>
                </div>
            )}
        </div>
    );
}

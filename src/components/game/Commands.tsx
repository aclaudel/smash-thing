import React from "react";

export type Listener = (characterId: string) => void;

export type Listeners = {
    left: Listener, move: Listener, right: Listener
}

export default function Commands(props: {
    characterId: string,
    listeners: Listeners
}) {
    return (
        <div data-testid="commands">
            <button
                data-testid={"left-button-" + props.characterId}
                onClick={() => props.listeners.left(props.characterId)}>
                LEFT
            </button>
            <button data-testid={"move-button-" + props.characterId}
                    onClick={() => props.listeners.move(props.characterId)}>
                MOVE
            </button>
            <button data-testid={"right-button-" + props.characterId}
                    onClick={() => props.listeners.right(props.characterId)}>
                RIGHT
            </button>
        </div>
    );
}
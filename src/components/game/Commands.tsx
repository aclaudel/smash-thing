import React from "react";

export type Listener = () => void;

export type Listeners = {
    left: Listener, move: Listener, right: Listener
}

export default function Commands(props: {listeners: Listeners}) {
    return (
        <div data-testid="commands">
            <button data-testid="left-button" onClick={props.listeners.left}>LEFT</button>
            <button data-testid="move-button" onClick={props.listeners.move}>MOVE</button>
            <button data-testid="right-button" onClick={props.listeners.right}>RIGHT</button>
        </div>
    );
}
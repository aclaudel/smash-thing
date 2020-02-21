import React from "react";

export type Listener = () => void;

export type Listeners = {
    left: Listener, move: Listener, right: Listener
}

export default function Commands(props: {listeners: Listeners}) {
    return (
        <div data-testid="commands">
            <div data-testid="left-button" onClick={props.listeners.left}/>
            <div data-testid="move-button" onClick={props.listeners.move}/>
            <div data-testid="right-button" onClick={props.listeners.right}/>
        </div>
    );
}
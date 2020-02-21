import React from "react";
import {Button} from "react-bootstrap";

export type Listener = () => void;

export type Listeners = {
    left: Listener, move: Listener, right: Listener
}

export default function Commands(props: {listeners: Listeners}) {
    return (
        <div data-testid="commands">
            <Button data-testid="left-button" onClick={props.listeners.left}>LEFT</Button>
            <Button data-testid="move-button" onClick={props.listeners.move}>MOVE</Button>
            <Button data-testid="right-button" onClick={props.listeners.right}>RIGHT</Button>
        </div>
    );
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import CharacterState from "./core/character/CharacterState";
import Position from "./core/map/Position";
import Compass from "./core/orientation/Compass";
import WorldMap from "./core/map/WorldMap";

const initCharacterState = CharacterState.with(
    Position.of(0, 0),
    "NORTH",
    new Compass(),
    new WorldMap()
);

ReactDOM.render(<App characterState={initCharacterState} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

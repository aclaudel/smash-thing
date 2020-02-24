import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import GameEngine from "./core/game/GameEngine";
import WorldMap from "./core/map/WorldMap";
import Compass from "./core/orientation/Compass";

const gameEngine = new GameEngine(new WorldMap(), new Compass());
gameEngine.registerCharacter("id-1");
ReactDOM.render(<App
        gameEngine={gameEngine} />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

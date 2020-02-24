import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import GameEngine from "./core/game/GameEngine";
import Character from "./core/character/Character";

const gameEngine = new GameEngine(undefined, undefined);
const defaultCharacter = new Character("id-1", gameEngine);
gameEngine.addCharacter(defaultCharacter);
ReactDOM.render(<App
        gameEngine={gameEngine} />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import './style.css';
import createTodo from './todo.js';

console.log('This is a test message from index.js');

const body = document.querySelector('body');
const parentDiv = document.createElement('div');
parentDiv.id = 'main-div';

const generalHeader = document.createElement('h1');
generalHeader.innerHTML = "General";

parentDiv.appendChild(generalHeader);
body.appendChild(parentDiv);

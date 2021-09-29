import './style.css';
import {Todo, todoForm} from './todo.js';
import {format} from 'date-fns';
import {setupFooter, setupLeftPanel} from './projects.js';

// parent Div holds all non-footer elements. 
const body = document.querySelector('body');
const parentDiv = document.createElement('div');
parentDiv.id = 'parent-div';


// right div holds most of the page content
const rightDiv = document.createElement('div');
rightDiv.id = 'right-div';

// Setup default page
const generalHeader = document.createElement('h1');
generalHeader.id = "project-header";
generalHeader.innerHTML = "General";
rightDiv.appendChild(generalHeader);

// Setup the todo inputs. These should be on any page
let todoInputs = todoForm;
let todoDiv = todoInputs.create();
rightDiv.appendChild(todoDiv);


// left div exists for project bar on left
const leftDiv = setupLeftPanel();

// These are temporary. Eventually localStorage should populate these
// const testTodo = Todo("First task", "A test task.", new Date(2021, 9, 27), 9, false);
// const testDiv = testTodo.getTodoDiv();
// const test2Todo = Todo("Second task", "Another test task.", new Date(2021, 9, 27), 8, true);
// const test2Div = test2Todo.getTodoDiv();

let table = todoForm.makeTodoTable();

// rightDiv.appendChild(testDiv);
// rightDiv.appendChild(test2Div);
rightDiv.appendChild(table);


parentDiv.append(leftDiv, rightDiv)
body.append(parentDiv);

// This like the todo's at the top, should always be on the page
setupFooter();
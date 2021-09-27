import './style.css';
import {Todo, todoForm} from './todo.js';
import {format} from 'date-fns';
// import 'bootstrap';
// import {datepicker} from 'js-datepicker';

let testDate = new Date(9, 27, 2021);
console.log(`Original date: ${testDate}`);

console.log(`formatted date: ${format(new Date(2021, 9, 27), 'MM/dd/yyyy')}`)

let modDate = format(new Date(2021, 9, 27), 'MM/dd/yyyy');
console.log(`Modded date is: ${modDate}`);

const body = document.querySelector('body');
const parentDiv = document.createElement('div');
parentDiv.id = 'main-div';

const generalHeader = document.createElement('h1');
generalHeader.innerHTML = "General";
parentDiv.appendChild(generalHeader);

// Here add logic for making something that remains on the page that will add new 
// todo's
// const creationDiv = document.createElement('div');
// creationDiv.id = 'create-div';
// const createTodoBtn = document.createElement('button');
// createTodoBtn.textContent = "Create New Todo";
// createTodoBtn.id = 'create-todo-btn';

// const titleInput = document.createElement('input');
// titleInput.id = "title-input";

// const descInput = document.createElement('input');
// descInput.id = "description-input";

// const datePicker = document.createElement('input');
// datePicker.type = 'date';
// datePicker.id = 'date-input';

// const priorityInput = document.createElement('input');
// priorityInput.id = 'priority-input';

// // won't add an input for checked, as checked should be false by default
// creationDiv.append(createTodoBtn, titleInput, descInput, datePicker, priorityInput);
// parentDiv.appendChild(creationDiv);
let test = todoForm;
let todoDiv = test.create();
parentDiv.appendChild(todoDiv);

const testTodo = Todo("First task", "A test task.", new Date(2021, 9, 27), 9, false);

const testDiv = testTodo.getTodoDiv();

const test2Todo = Todo("Second task", "Another test task.", new Date(2021, 9, 27), 8, true);

const test2Div = test2Todo.getTodoDiv();
parentDiv.appendChild(testDiv);
parentDiv.appendChild(test2Div);


body.appendChild(parentDiv);
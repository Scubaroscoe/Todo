import './style.css';
import {Todo, todoForm} from './todo.js';
import {format} from 'date-fns';
import {setupFooter, setupLeftPanel} from './projects.js';
// import 'bootstrap';
// import {datepicker} from 'js-datepicker';

// let testDate = new Date(9, 27, 2021);
// console.log(`Original date: ${testDate}`);

// console.log(`formatted date: ${format(new Date(2021, 9, 27), 'MM/dd/yyyy')}`)

// let modDate = format(new Date(2021, 9, 27), 'MM/dd/yyyy');
// console.log(`Modded date is: ${modDate}`);

// parent Div holds all non-footer elements. 
const body = document.querySelector('body');
const parentDiv = document.createElement('div');
parentDiv.id = 'parent-div';

// left div exists for project bar on left
const leftDiv = setupLeftPanel();
// const leftDiv = document.createElement('div');
// leftDiv.id = 'left-div';

// const collapsibleProjects = document.createElement('button');
// collapsibleProjects.id = "collapsible-projects";
// collapsibleProjects.classList = "collapsible";
// collapsibleProjects.textContent = "Projects";
// const collapsibleDiv = document.createElement('div');
// collapsibleDiv.id = "collapsible-div";
// collapsibleDiv.classList = "content";
// collapsibleDiv.textContent = "Idk, something for now...";

// leftDiv.append(collapsibleProjects, collapsibleDiv);

// // here's the js for the collapsibility:
// collapsibleProjects.addEventListener("click", function() {
//     this.classList.toggle("active");
//     let content = this.nextElementSibling;
//     if (content.style.display === "block") {
//         content.style.display = "none";
//     } else {
//         content.style.display = "block";
//     }
// });

// right div holds most of the page content
const rightDiv = document.createElement('div');
rightDiv.id = 'right-div';



// Setup default page
const generalHeader = document.createElement('h1');
generalHeader.innerHTML = "General";
rightDiv.appendChild(generalHeader);

// Setup the todo inputs. These should be on any page
let todoInputs = todoForm;
let todoDiv = todoInputs.create();
rightDiv.appendChild(todoDiv);


// These are temporary. Eventually localStorage should populate these
const testTodo = Todo("First task", "A test task.", new Date(2021, 9, 27), 9, false);
const testDiv = testTodo.getTodoDiv();
const test2Todo = Todo("Second task", "Another test task.", new Date(2021, 9, 27), 8, true);
const test2Div = test2Todo.getTodoDiv();

rightDiv.appendChild(testDiv);
rightDiv.appendChild(test2Div);

parentDiv.append(leftDiv, rightDiv)
body.append(parentDiv);

// This like the todo's at the top, should always be on the page
setupFooter();
// import PubSub from 'pubsub-js';
import { CleanPlugin } from 'webpack';
import {todoForm} from './todo.js';
// this script is to be used for first adding a constant footer containing 
// details for adding new projects and possibly going to them

// This function checks if browser can use webstorage API. Only really old browsers would not work
function storageAvailable(type) {
	var storage;
	try {
		storage = window[type];
		var x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch(e) {
		return e instanceof DOMException && (
			//everything except firefox
			e.code === 22 ||
			// test name field too, because code might not be present
			//everything except firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length != 0);
	}
}

if (storageAvailable('localStorage')) {
	console.log('Local Storage is usable!');
} else {
	console.log('Local storage is not usable...');
}

let projectsArray = [];
function populateStorage() {
	projectsArray = projectsArray.filter(n => n);
	console.log(`populating storage with this: ${JSON.stringify(projectsArray)}`);
	localStorage.setItem('projectsArray', JSON.stringify(projectsArray));
	setStorage();
}

function setStorage() {
	let storedContainer = JSON.parse(localStorage.getItem('projectsArray'));
	if (storedContainer) {	// if storedContainer is not null, then store in library
		projectsArray = storedContainer;
        // projectsArray = ["General", "Houses", "Finances"];
        // projectsArray.push('General');
	} else {	// else set projectsArray to empty array
		projectsArray = [];
	}
	// localStorage.clear();
}

if (!localStorage.getItem('projectsArray')) {
	// populate local storage
	populateStorage();
} else {
	// add the existing stored values to the page where they belong
	setStorage();
}


export function setupFooter() {
    const mainHTML = document.querySelector('html');
    const footer = document.createElement('footer');
    // Not sure why, but the below is necessary to use the footer styles
    footer.id = "footer";

    let projectsHeader = document.createElement('h2');
    projectsHeader.textContent = "Create new Projects here:"
    projectsHeader.id = "projects-header";

    const footerDiv = document.createElement('div');
    footerDiv.id = "footer-div";

    const projectsInput = document.createElement('input');
    projectsInput.id = "projects-input";

    const projectsButton = document.createElement('button');
    projectsButton.textContent = "Create New Project";
    projectsButton.id = "projects-button";
    projectsButton.addEventListener('click', (e) => {
        // Add a button to the left projects panel
        if (projectsInput.value) {
            let collapsibleDiv = document.querySelector("#collapsible-div");
            const projectButton = document.createElement('button');
            projectButton.classList = "project-btn";
            projectButton.textContent = projectsInput.value;
            // add a project to the Project's array
            projectsArray.push(projectsInput.value);
            // projectsArray = [];
            populateStorage();
            collapsibleDiv.appendChild(projectButton);
        }

    })

    footerDiv.append(projectsHeader, projectsInput, projectsButton);
    footer.appendChild(footerDiv);
    mainHTML.appendChild(footer);
}

function changeProject(e) {
    // Clicking a button should do two things. 
    // 1. Change the page header to reflect the project selected
    const projectHeader = document.querySelector('#project-header');
    projectHeader.textContent = e.target.innerHTML;
    
    // 2. Change the projects displayed to those that belong in the project
    let table = todoForm.makeTodoTable();
    let rightDiv = document.querySelector('#right-div');
    rightDiv.appendChild(table);
    
    // General is a special case that holds all tasks

}

// function fillLeftPanel() {
//     let collapsibleDiv = document.querySelector('#collapsible-div');
//     for (let i = 0; i < projectsArray.length; i++) {
//         let projButton = document.createElement('button');
//         projButton.classList = 'project-btn';
//         projButton.textContent = projectsArray[i];
//         collapsibleDiv.appendChild(projButton);
//     }
// }

export function setupLeftPanel() {
    const leftDiv = document.createElement('div');
    leftDiv.id = 'left-div';

    const collapsibleProjects = document.createElement('button');
    collapsibleProjects.id = "collapsible-projects";
    collapsibleProjects.classList = "collapsible";
    // The below was necessary to have text oriented down
    const collapsibleP = document.createElement('p');
    collapsibleP.id = "collapsible-p";
    collapsibleP.textContent = "Projects";
    collapsibleProjects.appendChild(collapsibleP);
    // collapsibleProjects.textContent = "Projects";
    // collapsibleProjects.style.cssText = "writing-mode:vertical-lr;text-orientation:mixed;";

    // Here's the logic for the content under the collapsible button
    const collapsibleDiv = document.createElement('div');
    collapsibleDiv.id = "collapsible-div";
    collapsibleDiv.classList = "content";
    // collapsibleDiv.textContent = "Idk, something for now...";
    // const generalButton = document.createElement('button');
    // generalButton.classList = "project-btn";
    // generalButton.id = "general-button";
    // generalButton.textContent = "General";
    // generalButton.addEventListener('click', changeProject);

    // collapsibleDiv.appendChild(generalButton);

    // fillLeftPanel();
    // add all buttons now
    for (let i = 0; i < projectsArray.length; i++) {
        let projButton = document.createElement('button');
        projButton.classList = 'project-btn';
        projButton.textContent = projectsArray[i];
        projButton.addEventListener('click', changeProject);
        collapsibleDiv.appendChild(projButton);
    }
    
    leftDiv.append(collapsibleProjects, collapsibleDiv);

    // here's the js for the collapsibility:
    collapsibleProjects.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        let p = this.firstChild;
        if (content.style.display === "flex") {
            content.style.display = "none";
            p.style.cssText = "writing-mode: vertical-lr;text-orientation:mixed;"
        } else {
            content.style.display = "flex";
            p.style.cssText = "writing-mode: horizontal-tb;text-orientation:sideways-right;"
        }
    });

    return leftDiv;
}

function getProjectsArray() {
    return projectsArray;
} 

export {getProjectsArray};
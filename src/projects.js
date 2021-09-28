import PubSub from 'pubsub-js';
import { CleanPlugin } from 'webpack';
// this script is to be used for first adding a constant footer containing 
// details for adding new projects and possibly going to them
// Also should hold pubsub

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

    
    // Instantiate pubsub - may want to put this in its own module?
    const mySubscriber = function(msg, data) {
        console.log(msg, data);
    };
    
    const token = PubSub.subscribe('My Topic', mySubscriber);
    

    const projectsButton = document.createElement('button');
    projectsButton.textContent = "Create New Project";
    projectsButton.id = "projects-button";
    projectsButton.addEventListener('click', (e) => {
        PubSub.publish('My Topic', "Hello World!");
    })

    footerDiv.append(projectsHeader, projectsInput, projectsButton);
    footer.appendChild(footerDiv);
    mainHTML.appendChild(footer);
}

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
    const generalButton = document.createElement('button');
    generalButton.classList = "project-btn";
    generalButton.id = "general-button";
    generalButton.textContent = "General";

    collapsibleDiv.appendChild(generalButton);


    leftDiv.append(collapsibleProjects, collapsibleDiv);

    // here's the js for the collapsibility:
    collapsibleProjects.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        let p = this.firstChild;
        if (content.style.display === "block") {
            content.style.display = "none";
            p.style.cssText = "writing-mode: vertical-lr;text-orientation:mixed;"
        } else {
            content.style.display = "block";
            p.style.cssText = "writing-mode: horizontal-tb;text-orientation:sideways-right;"
        }
    });

    return leftDiv;
}

function newProject(name) {

} 
import {format} from 'date-fns';


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

let todoArray = [];
function populateStorage() {
	todoArray = todoArray.filter(n => n);
	console.log(`populating storage with this: ${JSON.stringify(todoArray)}`);
	localStorage.setItem('todoArray', JSON.stringify(todoArray));
	setStorage();
}

function setStorage() {
	let storedContainer = JSON.parse(localStorage.getItem('todoArray'));
	if (storedContainer) {	// if storedContainer is not null, then store in library
		todoArray = storedContainer;
	} else {	// else set todoArray to empty array
		todoArray = [];
	}
	// localStorage.clear();
}

if (!localStorage.getItem('todoArray')) {
	// populate local storage
	populateStorage();
} else {
	// add the existing stored values to the page where they belong
	setStorage();
}

function Todo(title, description, dueDate, priority, checked, project) {
    return {
        title: title,
        description: description, 
        dueDate: format(new Date(dueDate), "MM/dd/yyyy"),
        priority: priority,
        checked: checked,
        project: project,
        // getTodoDiv() {
        //     const todoDiv = document.createElement('div');
        //     todoDiv.classList = 'todoDiv';
        //     const todoContainer = document.createElement('ul');

        //     const titleLi = document.createElement('li');
        //     titleLi.textContent = title;
        //     const descLi = document.createElement('li');
        //     descLi.textContent = description;
        //     const dueDateLi = document.createElement('li');
        //     dueDateLi.textContent = this.dueDate;
        //     const priorityLi = document.createElement('li');
        //     priorityLi.textContent = priority;
        //     const checkedLi = document.createElement('li');
        //     checkedLi.textContent = checked;

        //     todoContainer.append(titleLi, descLi, dueDateLi, priorityLi, checkedLi);

        //     todoDiv.appendChild(todoContainer);
        //     return todoDiv;
        // }
    }
}

// addTodo function (for creation of all the elements that make the piece of the page 
// that has inputs for adding a new todo)

const todoForm = (() => {
    // Here add logic for making something that remains on the page that will add new 
    // todo's
    const create = () => {
        const creationDiv = document.createElement('div');
        creationDiv.id = 'create-div';

        const holderDiv = document.createElement('div');

        const createHeader = document.createElement('h2');
        createHeader.id = 'create-header';
        createHeader.textContent = "Create new Todo's here";

        const createTodoBtn = document.createElement('button');
        createTodoBtn.textContent = "Create New Todo";
        createTodoBtn.id = 'create-todo-btn';
        createTodoBtn.addEventListener('click', btnAddTodoRow);

        const titleInput = document.createElement('input');
        titleInput.id = "title-input";
        titleInput.placeholder = "Title";

        const descTextarea = document.createElement('textarea');
        descTextarea.id = "description-textarea";
        descTextarea.placeholder = "Description...";

        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.id = 'date-input';

        const priorityInput = document.createElement('input');
        priorityInput.id = 'priority-input';
        priorityInput.placeholder = "Priority";

        const projectInput = document.createElement('input');
        projectInput.id = 'project-input';
        projectInput.placeholder = "Project";

        // won't add an input for checked, as checked should be false by default
        creationDiv.append(createTodoBtn, titleInput, descTextarea, datePicker, 
            priorityInput, projectInput);
        holderDiv.append(createHeader, creationDiv);
        // return creationDiv;
        return holderDiv;
    }

    // This is used for the general page
    function makeTodoTable() {
        let currentTable = document.querySelector('#todo-table');
        if (currentTable) {
            currentTable.remove();
        }
        let table = makeTableHead();
        let body = createBody();
        table.appendChild(body);
        return table;
        // addTodoRow() ? or make Table body?
    }

    // // This is for some specific project page
    // function makeProjTodoTable() {
    //     // delete previous table elements
    //     let currentTable = document.querySelector('#todo-table');
    //     if (currentTable) {
    //         currentTable.remove();
    //     }
    //     let table = makeTableHead();
    //     let body = createBody();
    //     table.appendChild(body);
    //     return table;
    //     // addTodoRow() ? or make Table body?
    // }

    function makeTableHead() {

        let table = document.createElement('table');
        table.id = "todo-table";
        let tblHead = table.createTHead();
        let tblHeadRow = tblHead.insertRow();

        const columnNames = ["Title", "Description", "DueDate", "Priority", 
                            "Checked", "Project", "Delete"];

        columnNames.forEach((col) => {
            let th = document.createElement('th');
            let text = document.createTextNode(col);
            th.appendChild(text);
            tblHeadRow.appendChild(th);
        });

        return table;
    }

    function addTodoRow(todo) {
        let body = document.querySelector('tbody');
        let row = document.createElement("tr");
        // row.setAttribute("data-ind", i);
        for (let prop in todo){
            //create a table row
            // create td element and text node. text node fills the td
            let cell = document.createElement('td');
            let cellCont = document.createTextNode(`${todo[prop]}`);
            cell.appendChild(cellCont);
            row.appendChild(cell);
        }
        // this last bit for adding a delete button
        let cell = document.createElement('td');
        let delButton = document.createElement('button');
        delButton.classList = 'del-btn';
        delButton.textContent = 'Delete';
        delButton.addEventListener('click', (e) => {
            todoArray.slice(todoArray.findIndex((element) => {
                element === todo;
            }))
            populateStorage();
            e.target.parentNode.remove();
        })
        cell.appendChild(delButton);
        row.appendChild(cell);
        body.appendChild(row);        
    }

    function btnAddTodoRow(e) {
        let table = document.querySelector('#todo-table');

        let title = document.querySelector('#title-input').value;
        let description = document.querySelector('#description-textarea').value;
        let dueDate = document.querySelector('#date-input').value;
        let priority = document.querySelector('#priority-input').value;
        let project = document.querySelector('#project-input').value;
        let todo = new Todo(title, description, dueDate, priority, false, project);
        // Add row to table here
        addTodoRow(todo);
        todoArray.push(todo);
        populateStorage();
        // document.querySelector('#right-div').appendChild(todoDiv);

    }
    
    // create all rows based on what's in local storage
    // function createTableRows(body, library) {
    function createBody() {	
        // if (library) {	// This needed in case library is set to null by setStorage
        let body = document.createElement('tbody');
        let projHeader = document.querySelector('#project-header');
        for (let i = 0; i < todoArray.length; i++){
            // This is for when page is first loaded
            if (!projHeader) {
                let row = makeRow(todoArray[i]);
                body.appendChild(row);
            } else if (projHeader.value === "General") {
                //create a table row
                let row = makeRow(todoArray[i]);
                // const row = document.createElement("tr");
                // row.setAttribute("data-ind", i);
                // for (let j in todoArray[i]) {
                //     // create td element and text node. text node fills the td
                //     let cell = document.createElement('td');
                //     let cellCont = document.createTextNode(`${todoArray[i][j]}`);
                //     cell.appendChild(cellCont);
                //     row.appendChild(cell);
                // }
                // // The following code is for creation of delete button
                // let cell = document.createElement('td');
                // let delButton = document.createElement('button');
                // delButton.classList = 'del-btn';
                // delButton.textContent = 'Delete';
                // delButton.addEventListener('click', (e) => {
                //     todoArray.splice(todoArray.findIndex(element => element === todoArray[i]), 1);
                //     populateStorage();
                //     e.target.parentNode.parentNode.remove();
                // })
                // cell.appendChild(delButton);
                // row.appendChild(cell);
                body.appendChild(row);
            } else if (todoArray[i].project === projHeader.value){
                //create a table row
                let row = makeRow(todoArray[i]);
                // const row = document.createElement("tr");
                // row.setAttribute("data-ind", i);
                // for (let j in todoArray[i]) {
                //     // create td element and text node. text node fills the td
                //     let cell = document.createElement('td');
                //     let cellCont = document.createTextNode(`${todoArray[i][j]}`);
                //     cell.appendChild(cellCont);
                //     row.appendChild(cell);
                // }
                // // The following code is for creation of delete button
                // let cell = document.createElement('td');
                // let delButton = document.createElement('button');
                // delButton.classList = 'del-btn';
                // delButton.textContent = 'Delete';
                // delButton.addEventListener('click', (e) => {
                //     todoArray.splice(todoArray.findIndex(element => element === todoArray[i]), 1);
                //     populateStorage();
                //     e.target.parentNode.parentNode.remove();
                // })
                // cell.appendChild(delButton);
                // row.appendChild(cell);
                body.appendChild(row);
            }
        }
        return body;
    }

    function makeRow(todo) {
        const row = document.createElement("tr");
        // row.setAttribute("data-ind", i);
        for (let j in todo) {
            // create td element and text node. text node fills the td
            let cell = document.createElement('td');
            let cellCont = document.createTextNode(`${todo[j]}`);
            cell.appendChild(cellCont);
            row.appendChild(cell);
        }
        // The following code is for creation of delete button
        let cell = document.createElement('td');
        let delButton = document.createElement('button');
        delButton.classList = 'del-btn';
        delButton.textContent = 'Delete';
        delButton.addEventListener('click', (e) => {
            todoArray.splice(todoArray.findIndex(element => element === todo), 1);
            populateStorage();
            e.target.parentNode.parentNode.remove();
        })
        cell.appendChild(delButton);
        row.appendChild(cell);
        return row;
    }

    // function addTodo(e) {
    //     let title = document.querySelector('#title-input').innerHTML;
    //     let description = document.querySelector('#description-textarea').innerHTML;
    //     let dueDate = document.querySelector('#date-input').innerHTML;
    //     let priority = document.querySelector('#priority-input').innerHTML;
    //     let project = document.querySelector('#project-input').innerHTML;
    //     // let todoDiv = new Todo(title, description, dueDate, priority, false).getTodoDiv();
    //     let todo = new Todo(title, description, dueDate, priority, false, project);        
    //     // document.querySelector('#right-div').appendChild(todoDiv);
    //     todoArray.push(todo);
    //     populateStorage()
    // }

    return {create, makeTodoTable};
})();

export {Todo, todoForm};
import {format, formatDistance, formatRElative, subDays} from 'date-fns';

// format(new Date(2021, 9, 27), 'MM/dd/yyyy');

function Todo(title, description, dueDate, priority, checked) {
    return {
        title: title,
        description: description, 
        dueDate: format(dueDate, "MM/dd/yyyy"),
        priority: priority,
        checked: checked,
        getTodoDiv() {
            const todoDiv = document.createElement('div');
            todoDiv.classList = 'todoDiv';
            const todoContainer = document.createElement('ul');

            const titleLi = document.createElement('li');
            titleLi.textContent = title;
            const descLi = document.createElement('li');
            descLi.textContent = description;
            const dueDateLi = document.createElement('li');
            dueDateLi.textContent = this.dueDate;
            const priorityLi = document.createElement('li');
            priorityLi.textContent = priority;
            const checkedLi = document.createElement('li');
            checkedLi.textContent = checked;

            todoContainer.append(titleLi, descLi, dueDateLi, priorityLi, checkedLi);

            todoDiv.appendChild(todoContainer);
            return todoDiv;
        }
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
        createTodoBtn.addEventListener('click', addTodo);

        const titleInput = document.createElement('input');
        titleInput.id = "title-input";

        const descTextarea = document.createElement('textarea');
        descTextarea.id = "description-textarea";

        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.id = 'date-input';

        const priorityInput = document.createElement('input');
        priorityInput.id = 'priority-input';

        // won't add an input for checked, as checked should be false by default
        creationDiv.append(createTodoBtn, titleInput, descTextarea, datePicker, priorityInput);
        holderDiv.append(createHeader, creationDiv);
        // return creationDiv;
        return holderDiv;
    }

    function makeTodoTable() {
        makeTableHead();
        // addTodoRow() ? or make Table body?
    }
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
    }

    function addTodoRow(todo) {
        let table = document.querySelector('#todo-table');

    }
    
    // create all cells
    // function createTableRows(body, library) {
    function createTableRows(body) {	
        // if (library) {	// This needed in case library is set to null by setStorage
        for (let i = 0; i < library.length; i++){
            //create a table row
            const row = document.createElement("tr");
            row.setAttribute("data-ind", i);
            for (let j in library[i]) {
                // create td element and text node. text node fills the td
                let cell = document.createElement('td');
                let cellCont = document.createTextNode(`${library[i][j]}`);
                cell.appendChild(cellCont);
                row.appendChild(cell);
            }
            // This is hideous, but localStorage was having significant problems with storing 
            // the functions defined in book, so I made them functions outside of the Book
            // object. This part is an ugly fix to add the two columns previously assumed to exist
            // in the book object.
            for (let k = 0; k < 2; k++) {
                let cell = document.createElement('td');
                let cellCont;
                if (k === 0) {
                    cellCont = document.createElement('button');
                    cellCont.textContent = "Remove";
                    cellCont.addEventListener('click', (e) => {
                        let parentRow = document.querySelector(`tr[data-ind="${i}"]`);
                        parentRow.remove();
                        delete library[i];
                        populateStorage();	// This to keep stored library perfectly updated
                    })
                } else {
                    cellCont = document.createElement('button');
                    cellCont.textContent = "Toggle Read";
                    cellCont.addEventListener('click', (e) => {
                        library[i].toggle();
                        let parentRow = document.querySelector(`tr[data-ind="${i}"]`);
                        let rowCells = parentRow.querySelectorAll('td');
    
                        let propVal = rowCells[3].textContent; // This should always be 3
                        if (propVal === "true" || propVal == "false") {
                            rowCells[3].textContent = library[i].read;
                        }
    
                        // for (let prop in rowCells) {
                        // }
                        populateStorage();	// This to keep stored library perfectly updated
                    });
                }
                cell.appendChild(cellCont);
                row.appendChild(cell);
            }
            body.appendChild(row);
        }
    }

    function addTodo(e) {
        let title = titleInput.innerHTML;
        let description = descTextarea.innerHTML;
        let dueDate = datePicker.innerHTML;
        let priority = priorityInput.innerHTML;
        let todoDiv = new Todo(title, description, dueDate, priority, false).getTodoDiv();
        document.querySelector('#right-div').appendChild(todoDiv);
    }

    return {create};
})();

export {Todo, todoForm};
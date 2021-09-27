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
    const create = () => {
        const creationDiv = document.createElement('div');
        creationDiv.id = 'create-div';
        const createTodoBtn = document.createElement('button');
        createTodoBtn.textContent = "Create New Todo";
        createTodoBtn.id = 'create-todo-btn';
        createTodoBtn.addEventListener('click', addTodo);

        const titleInput = document.createElement('input');
        titleInput.id = "title-input";

        const descInput = document.createElement('input');
        descInput.id = "description-input";

        const datePicker = document.createElement('input');
        datePicker.type = 'date';
        datePicker.id = 'date-input';

        const priorityInput = document.createElement('input');
        priorityInput.id = 'priority-input';

        // won't add an input for checked, as checked should be false by default
        creationDiv.append(createTodoBtn, titleInput, descInput, datePicker, priorityInput);

        return creationDiv;
    }

    function addTodo(e) {
        let title = titleInput.innerHTML;
        let description = descInput.innerHTML;
        let dueDate = datePicker.innerHTML;
        let priority = priorityInput.innerHTML;
        let todoDiv = new Todo(title, description, dueDate, priority, false).getTodoDiv();
        document.querySelector('body div').appendChild(todoDiv);
    }

    return {create};
})();

export {Todo, todoForm};
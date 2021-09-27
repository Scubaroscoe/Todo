export default function createTodo(title, description, dueDate, priority, checked) {
    return {
        title: title,
        description: description, 
        dueDate: dueDate,
        priority: priority,
        checked: checked
    }
}

// export {createTodo};
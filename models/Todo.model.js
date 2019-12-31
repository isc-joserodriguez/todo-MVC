export class Todo {
    constructor() {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        console.log(this.todos)
    }

    addTodo(name) {
        const newTodo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            name: name,
            dateCreated: new Date(),
            dateFinished: new Date(),
            status: false,
        }
        this.todos.push(newTodo);
    }
}
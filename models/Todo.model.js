export class Todo {
    constructor() {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
    }

    addTodo(name) {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        const newTodo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            name: name,
            dateCreated: formatAMPM(),
            dateFinished: formatAMPM(),
            status: false,
        }
        this.todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    editTodo(id, updatedName) {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        this.todos = this.todos.map(todo =>
            todo.id === id ?
                {
                    id: todo.id,
                    name: updatedName,
                    dateCreated: todo.dateCreated,
                    dateFinished: todo.dateFinished,
                    status: todo.status
                } : todo
        );
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    deleteTodo(id) {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        this.todos = this.todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    statusTodo(id) {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        this.todos = this.todos.map(todo =>
            todo.id === id ?
                {
                    id: todo.id,
                    name: todo.name,
                    dateCreated: todo.dateCreated,
                    dateFinished: formatAMPM(),
                    status: !todo.status
                } : todo
        );
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    completed() {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        this.todos = this.todos.filter(todo => todo.status);
    }
    uncompleted() {
        var todo = localStorage.getItem('todos');
        this.todos = JSON.parse(todo) ? JSON.parse(todo) : [];
        this.todos = this.todos.filter(todo => !todo.status);
    }
}
function formatAMPM() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
}
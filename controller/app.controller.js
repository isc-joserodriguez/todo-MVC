import { Todo } from '../models/Todo.model.js'
$(document).ready(function () {
    var model = new Todo();

    var selecc = 1;

    //DOM Elements
    var todoList = $('#todoList');
    var inputTodo = $('#inputTodo');
    var btnAll = $('#btnAll');
    var btnCompleted = $('#btnCompleted');
    var btnUncompleted = $('#btnUncompleted');

    //DOM Dyn
    var btnEdit = '.btnEdit';
    var btnDel = '.btnDel';

    function updateList() {
        model.completed()
        model = new Todo();
        var left = model.todos.length;
        model = new Todo();
        var total = model.todos.length;
        todoList.empty();
        $('#count').text(left + '/' + total + ' task(s) completed');
        switch (selecc) {
            case 2:
                model = new Todo();
                model.completed();
                break;
            case 3:
                model = new Todo();
                model.uncompleted();
                break
        }

        model.todos.forEach(todo => {
            todoList.append(
                '<li id="taskLi' + todo.id + '" class="custom-checkbox mb-2 d-flex align-items-center justify-content-between task-' + todo.status + '">' +
                '<input type="checkbox" ' + ((todo.status) ? 'checked' : '') + ' class="custom-control-input check-task" id="task' + todo.id + '" name="task' + todo.id + '">' +
                '<label id="label' + todo.id + '" class="custom-control-label" for="task' + todo.id + '">' + todo.name + '</label>' +
                '<button type="button" class="ml-2 btn btn-sm btn-outline-info" data-toggle="collapse" href="#info' + todo.id + '" role="button" aria-expanded="false" aria-controls="info' + todo.id + '"><i class="fas fa-info"></i></button>' +
                '</li>' +
                '<div class="collapse" id="info' + todo.id + '">' +
                '<div class="card card-body bg-dark">' +
                '<div class="row">' +
                '<div class="col-8">' +
                '<input type="text" class="form-control edit-task" id="edit' + todo.id + '" value="' + todo.name + '">' +
                '</div>' +
                '<div class="col-2 d-flex align-item-center">' +
                '<button type="button" class="btnEdit ml-2 btn btn-sm btn-outline-info"><i class="fas fa-pen"></i></button>' +
                '<button type="button" class="btnDel ml-2 btn btn-sm btn-outline-danger"><i class="fas fa-trash-alt"></i></button>' +
                '</div>' +
                '</div>' +
                '<br>' +
                '<span class="date text-right">' + ((todo.status) ? 'Completed: '+todo.dateCreated : 'Created: '+todo.dateFinished) + '</span>' +
                '</div>' +
                '</div>');
        });

    }
    updateList();

    //Events
    inputTodo.on('keypress', function (e) {
        if (e.keyCode === 13 && inputTodo.val() !== '') {
            model = new Todo();
            model.addTodo(inputTodo.val());
            inputTodo.val('');
            updateList();
        }
    });
    $(document).on('click', btnEdit, function () {
        var id = $(this).parent().parent().parent().parent().attr('id').substring(4);
        model = new Todo();
        model.editTodo(parseInt(id), $('#edit' + id).val());
        $('#label' + id).text($('#edit' + id).val());
        updateList();
    });
    $(document).on('click', btnDel, function () {
        var id = $(this).parent().parent().parent().parent().attr('id').substring(4);
        model = new Todo();
        model.deleteTodo(parseInt(id));
        updateList();
    });
    $(document).on('change', '.check-task', function () {
        var target = $(this);
        var id = target.attr('id').substring(4);
        if (target.prop("checked")) {
            target.parent().removeClass('task-false');
            target.parent().addClass('task-true');
        } else {
            target.parent().removeClass('task-true');
            target.parent().addClass('task-false');
        }
        model = new Todo();
        model.statusTodo(parseInt(id));
        updateList();
    });
    //Mostrar tareas
    btnAll.on('click', function () {
        selecc = 1;
        updateList();
    });
    btnCompleted.on('click', function () {
        selecc = 2;
        updateList();
    });
    btnUncompleted.on('click', function () {
        selecc = 3;
        updateList();
    });
});

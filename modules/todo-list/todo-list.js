'use strict';

var TodoList = function() {
  var $tasksList = $('#tasks-list');
  var tasks = [];

  function renderTask(task) {
    var $input = $('<input type="checkbox"/>');
    var $label = $('<label/>');
    $label.append($input, task.name);

    var $btnDelete = $('<button type="button"/>');
    $btnDelete.attr({
      type: 'button',
      class: 'btn btn-default btn-delete pull-right glyphicon glyphicon-remove'
    });

    if (task.done) {
      $input.attr('checked', 'checked');
    }

    $input.on('click', function() {
      var id = $(this).parents('li').attr('id');
      var checked = this.checked;

      tasks = tasks.map(function(item) {
        if (item.id == id) {
          item.done = checked;
        }
        return item;
      });
    });

    $btnDelete.on('click', function() {
      var id = $(this).parent().attr('id');

      if (confirm('Seguro?')) {
        $(this).parent().remove();

        tasks = tasks.filter(function(item) {
          return item.id != id;
        });
      }
    });

    var $li = $('<li/>');
    $li.attr({
      id: task.id,
      class: 'list-group-item'
    });
    $li.append($label, $btnDelete);

    $tasksList.append($li);
  }

  $('#btn-add-task').on('click', function() {
    var name = $('#task-name-field').val();
    var task = {
      id: tasks.length + 1,
      name: name,
      done: false
    };
    tasks.push(task);
    renderTask(task);
    $('#task-name-field').val('');
  });

  $('#btn-remove-all').on('click', function() {
    $tasksList.empty();
    tasks = [];
  });

  var currentSort = 'asc';

  $('#btn-order-by-az').on('click', function() {
    currentSort = currentSort === 'asc' ? 'desc' : 'asc';

    tasks = tasks.sort(function(taskA, taskB) {
      if (currentSort === 'asc') {
        return taskA.name < taskB.name ? -1 : 1;
      }
      return taskA.name > taskB.name ? -1 : 1;
    });

    $tasksList.empty();

    tasks.forEach(renderTask);
  });

  $('#btn-order-by-id').on('click', function() {
    currentSort = currentSort === 'asc' ? 'desc' : 'asc';

    tasks = tasks.sort(function(taskA, taskB) {
      if (currentSort === 'asc') {
        return taskA.id < taskB.id ? -1 : 1;
      }
      return taskA.id > taskB.id ? -1 : 1;
    });

    $tasksList.empty();

    tasks.forEach(renderTask);
  });

  $('#btn-show-done').on('click', function() {
    currentSort = currentSort === 'asc' ? 'desc' : 'asc';

    var filteredTasks = tasks.filter(function(task) {
      if (currentSort === 'desc') {
        return task.done;
      }
      return task;
    });

    $tasksList.empty();

    filteredTasks.forEach(renderTask);
  });

  return {};
}();
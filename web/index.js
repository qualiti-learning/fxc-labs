function addTodo() {
  const nameInput = document.getElementById('name');

  const value = nameInput.value;

  if (!value) {
    console.log('Value is missing');

    return;
  }

  const todoList = document.getElementById('todo_list');

  const todo = document.createElement('li');

  todo.innerHTML = `<input type="checkbox" onchange="checkTodo()" /> ${value}`;

  todoList.appendChild(todo);

  nameInput.value = '';

  console.log('Saving todo...');
}

function checkTodo() {
  const {
    target: { checked, parentNode },
  } = event;

  if (checked) {
    parentNode.classList.add('completed');
  } else {
    parentNode.classList.remove('completed');
  }

  console.log('123', parentNode);
}

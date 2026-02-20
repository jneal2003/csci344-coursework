function addTodo() {
    // 1) Get the input element
    let target = document.querySelector('#todoInput');
    // 2) Get the value from the input (use .value property)
    let value = target.value;
    // 3) Get the ul element (the todo list)
    let todoList = document.querySelector("#todoList")
    // 4) Use insertAdjacentHTML('beforeend', '<li>...</li>') to add the item
    //    Make sure to include the todo text in the <li>
    todoList.insertAdjacentHTML('beforeend',  '<li>' + value + '</li>');
    // 5) Clear the input field (set .value to empty string)
    document.querySelector('#todoInput').value = ''; 
  }

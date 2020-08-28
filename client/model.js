class model {
  constructor() {
    //get last todolist's data from local storage
    this.todos = this.getLocalStorage();
    this.filterTodos = [];
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _currentTab = "";

  _changeList(tabLink) {
    switch (tabLink) {
      case "allBtn":
        this.filterTodos = this.todos;
        break;
      case "activeBtn":
        this.filterTodos = this.todos.filter(todo => !todo.complete);
        break;
      case "completeBtn":
        this.filterTodos = this.todos.filter(todo => todo.complete);
        break;
      default:
        this.filterTodos = this.todos;
        break;
    }
    this.onTodoListChanged(this.filterTodos);
    //this.setLocalStorage(this.todos);
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    }
    this.todos.push(todo);

    this._changeList(this._currentTab);
  }

  // Map through all todos, and replace the text of the todo with the specified id
  editTodo(id, updatedText) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: updatedText, complete: todo.complete } : todo
    );

    this._changeList(this._currentTab);
  }

  // Filter a todo out of the array by id
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this._changeList(this._currentTab);
  }

  // Flip the complete boolean on the specified todo  
  completeTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
    );

    this._changeList(this._currentTab);
  }

  // Filter a todo out of the array by id  
  filterTodo(tabLink) {
    this._currentTab = tabLink;
    this._changeList(tabLink);
  }

  //get last todolist's data from local storage
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  }

  //save todolist's data in local storage
  setLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    this._changeList(this._currentTab);
  }

}
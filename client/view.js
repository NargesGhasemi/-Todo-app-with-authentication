class view {
  constructor() {
    this.myTable = this.findElementbyId('todoListTable');
    this.userName = this.findElementbyId('user');
  }

  get _todoText() {
    this.input = this.findElementbyId("inputTask");
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  // Create an element with an optional CSS class
  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector)
    return element
  }

  // find an element by id 
  findElementbyId(id) {
    const element = document.getElementById(id);
    return element;
  }

  // find an element by class name
  findElementbyClassName(className) {
    const element = document.getElementsByClassName(className);
    return element;
  }

  displayTodos(todos) {
    //remove all tables'tr
    while (this.myTable.childNodes[1]) {
      this.myTable.removeChild(this.myTable.childNodes[1]);
    }
    //create table acording todos list
    if (todos.length === 0) {
      const tr = this.createElement("tr");
      tr.textContent = "Nothing to do!";
      this.myTable.append(tr);
    }
    else {
      // Create todo item nodes for each todo in state
      todos.forEach(todo => {
        const tr = this.createElement('tr');
        tr.id = todo.id;
        const td1 = this.createElement('td');
        td1.classList.add("leftTd");
        td1.textContent = todo.text;

        // If the todo is complete, it will have a strikethrough
        if (todo.complete) {
          td1.classList.add("complete");
        }

        // The todos will also have a delete button
        const td2 = this.createElement('td');
        td2.classList.add("rightTd");
        const deleteButton = this.createElement('button', 'deleteBtn');
        deleteButton.textContent = 'Delete';
        td2.append(deleteButton);

        // The todos will also have a edit button
        const td3 = this.createElement('td');
        td3.classList.add("rightTd");
        const editButton = this.createElement('button', 'editBtn');
        editButton.textContent = 'edit';
        td3.append(editButton);

        // The todos will also have a complete button
        const td4 = this.createElement('td');
        td4.classList.add("rightTd");
        const completeButton = this.createElement('button', 'completeBtn');
        completeButton.textContent = 'complete';
        td4.append(completeButton);

        //append all tds to tr
        tr.append(td1, td2, td3, td4);

        // Append tr to the Table
        this.myTable.append(tr);

      })
    }
  }

  bindTabLink(handler) {
    const TabLinks = this.findElementbyClassName("tabLink");
    for (let index = 0; index < TabLinks.length; index++) {
      TabLinks[index].addEventListener('click', event => {

        //first remove active class from all tabs
        TabLinks[0].classList.remove("active");
        TabLinks[1].classList.remove("active");
        TabLinks[2].classList.remove("active");

        //set active class for current tab
        event.target.classList.add("active");

        const id = event.target.id;
        handler(id);
      })
    }
  }

  bindAddTodo(handler) {
    const button = this.findElementbyId("addBtn");
    button.addEventListener('click', event => {
      if (this._todoText) {
        handler(this._todoText)
        this._resetInput();
      }
    })
  }

  bindDeleteTodo(handler) {
    this.myTable.addEventListener('click', event => {
      if (event.target.className === 'deleteBtn') {
        const id = parseInt(event.target.parentElement.parentElement.id);
        handler(id);
      }
    })
  }

  bindEditTodo(handler) {
    this.myTable.addEventListener('click', event => {
      if (event.target.className === 'editBtn') {
        const newtask = prompt("please insert new task", event.target.parentElement.parentElement.childNodes[0].innerText);
        if (newtask) {
          const id = parseInt(event.target.parentElement.parentElement.id);
          handler(id, newtask);
        }
      }
    })
  }

  bindCompleteeTodo(handler) {
    this.myTable.addEventListener('click', event => {
      if (event.target.className === 'completeBtn') {
        const id = parseInt(event.target.parentElement.parentElement.id)
        handler(id)
      }
    })
  }

  bindUploadTodo(handler) {
    const button = this.findElementbyId("uploadBtn");
    button.addEventListener('click', event => {
      handler()
    })
  }

  bindDownloadTodo(handler) {
    const button = this.findElementbyId("downloadBtn");
    button.addEventListener('click', event => {
      handler();
    })
  }
}
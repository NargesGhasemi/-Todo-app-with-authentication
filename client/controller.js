class controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindCompleteeTodo(this.handleCompleteTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindTabLink(this.handleTabLink);
    this.view.bindUploadTodo(this.handleUpload);
    this.view.bindDownloadTodo(this.handleDownload);
    // this.view.bindSignIn(this.handleSignIn);
    // this.view.bindSignUp(this.handleSignUp);

    // Display initial todos
    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = todos => {
    this.view.displayTodos(todos);
  }

  handleAddTodo = todoText => {
    this.model.addTodo(todoText);
  }

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  }

  handleDeleteTodo = id => {
    this.model.deleteTodo(id);
  }

  handleCompleteTodo = id => {
    this.model.completeTodo(id);
  }

  handleTabLink = id => {
    this.model.filterTodo(id);
  }

  handleUpload = () => {
    if (!this.model.todos)
      return;
    var data = JSON.stringify(this.model.todos);
    var jwt = localStorage.getItem('jwt');
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        alert('upload successful!')
      else if (xmlHttp.readyState === 4 && (xmlHttp.status === 500 || xmlHttp.status === 401)) {
        alert(xmlHttp.responseText);
      }
    }

    xmlHttp.open('POST', 'write', true);
    xmlHttp.setRequestHeader('jwt', jwt);
    xmlHttp.send(data);
  }

  handleDownload = () => {
    var jwt = localStorage.getItem('jwt');
    var xmlHttp = new XMLHttpRequest();
    var self = this;
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var data = JSON.parse(xmlHttp.responseText);
        self.model.todos = data;
        //self.model.bindTodoListChanged();
        //self.onTodoListChanged(self.model.todos);
        self.model.setLocalStorage(self.model.todos);
        alert("replace Successfully!");
      }
      else if (xmlHttp.readyState === 4 && (xmlHttp.status === 500 || xmlHttp.status === 401)) {
        alert(xmlHttp.responseText);
      }
    };
    xmlHttp.open('GET', 'read', true);
    xmlHttp.setRequestHeader('jwt', jwt);
    xmlHttp.send();
  }

}

var signUpBtn = document.getElementById("signUpBtn"),
  passwordInp = document.getElementById("password"),
  fullNameInp = document.getElementById("fullName"),
  userNameInp = document.getElementById("userName");

signUpBtn.addEventListener('click', signUp);


function signUp() {

  if (!fullNameInp.value) {
    alert("please enter fullname!");
    return;
  }
  
  if (!userNameInp.value) {
    alert("please enter username!");
    return;
  }

  if (!passwordInp.value) {
    alert("please enter password!");
    return;
  }

  userInfo = {
    fullname: fullNameInp.value,
    username: userNameInp.value,
    password: passwordInp.value
  }

  var data = JSON.stringify(userInfo);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.status == 200 && request.readyState == 4) {
      alert("signed up successfully!");
      let jwt = atob(request.getResponseHeader('jwt'));
      localStorage.setItem('todos', '[]');
      localStorage.setItem('jwt', request.getResponseHeader('jwt'));
      document.location.href = 'http://localhost:8081/index.html';
      // document.location.href = `http://localhost:8081/user/${jwt}`;

    }
    else if (request.readyState === 4 && request.status === 401) {
      alert(request.responseText);
    }
  };
  request.open('POST', 'signUp', true);
  request.setRequestHeader('Content-Type', 'text/plain')
  request.send(data);
}
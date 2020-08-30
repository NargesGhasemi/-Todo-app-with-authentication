var signInBtn = document.getElementById("signInBtn"),
  passwordInp = document.getElementById("password"),
  userNameInp = document.getElementById("userName");

signInBtn.addEventListener('click', signIn);

function signIn() {
  userInfo = {
    username: userNameInp.value,
    password: passwordInp.value
  }

  var data = JSON.stringify(userInfo);
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.status == 200 && request.readyState == 4) {
      let jwt = request.getResponseHeader('jwt');
      localStorage.setItem('todos', request.responseText);
      localStorage.setItem('jwt', jwt);
      alert('Signed in successfully!');
      document.location.href = 'http://localhost:8081/index.html';
    }
    else if (request.readyState === 4 && (request.status === 401 || request.status === 500)) {
      alert(request.responseText);
    }
  };
  request.open('POST', 'signIn', true);
  request.setRequestHeader('Content-Type', 'text/plain')
  request.send(data);
}

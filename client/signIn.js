var signInBtn = document.getElementById("signInBtn"),
  passwordInp = document.getElementById("password"),
  userNameInp = document.getElementById("userName"),
  user = document.getElementById("user");

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
      // user.value = getUsername();
      document.location.href = 'http://localhost:8081/index.html';
      //document.location.href = `http://localhost:8081/user/` + atob(jwt);
    }
    else if (request.readyState === 4 && (request.status === 401 || request.status === 500)) {
      alert(request.responseText);
    }
  };
  request.open('POST', 'signIn', true);
  request.setRequestHeader('Content-Type', 'text/plain')
  request.send(data);
}

// function getUsername() {
//   let token = atob(localStorage.getItem('jwt'));
//   let firstIndex = token.indexOf('=') + 1;
//   let lastIndex = token.lastIndexOf('&');
//   let name = token.substring(firstIndex, lastIndex);
//   let username = token.substring(lastIndex + 1, token.length);
//   let fullName = name + " " + username;
//   return fullName;
// }
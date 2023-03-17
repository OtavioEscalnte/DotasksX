// Rotas
function registerScreen() {
  window.location.pathname = "./register.html";
}

function loginScreen() {
  window.location.pathname = "./login.html";
}

function register() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  localStorage.setItem("name", name);
  localStorage.setItem("password", password);
  alert("Cadastro realizado com sucesso!");
}

//Função para fazer o login e redirecionar para outra página
function login() {
  var nameLogin = document.getElementById("name").value;
  var passwordLogin = document.getElementById("password").value;
  var nameStorage = localStorage.getItem("name");
  var passwordStorage = localStorage.getItem("password");
  if (nameLogin == nameStorage && passwordLogin == passwordStorage) {
    alert("Login realizado com sucesso!");
    window.location.href = "panel.html"; //Redireciona para outra página
  } else {
    alert("Nome de usuário ou senha incorretos.");
  }
}

// Rotas
function registerScreen() {
  window.location.pathname = "./register.html";
}

function loginScreen() {
  window.location.pathname = "./login.html";
}

// validação de senha
function validatePassword(password) {
  var validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return validate.test(password);
}

// Função para registar novo usuário e salvar no local storage
function register() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  //validação de senha
  if(!validatePassword(password)) {
    var error = document.createElement("div");
    error.innerHTML = "<p class='font-medium text-base text-red-400 mt-4 '>Senha inválida. A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.</p>"
    var afterBtnRegister = document.getElementsByTagName("button")[0]
    var registerForm = document.getElementById("register-form");
    registerForm.insertBefore(error, afterBtnRegister);
    setTimeout(()=> {
      var removeDivInvalidPassword = document.getElementsByTagName("p")[3]
      removeDivInvalidPassword.remove()
    },2000);
    return;
  }
  localStorage.setItem("name", name);
  localStorage.setItem("password", password);

  
  loginScreen()
}

//Função para fazer o login e redirecionar para outra página
var nameStorage = localStorage.getItem("name");
var passwordStorage = localStorage.getItem("password");
function login() {
  var nameLogin = document.getElementById("name").value;
  var passwordLogin = document.getElementById("password").value;
  var validCredentials = nameLogin == nameStorage && passwordLogin == passwordStorage
  
  if (validCredentials) {
    window.location.href = "panel.html";
  } else {
    alert("Nome de usuário ou senha incorretos.");
  }
}

// Renderiza o valor name salvo no localstorage na tela panel 
document.getElementById('welcome').textContent = `Seja bem-vindo, ${nameStorage}!`

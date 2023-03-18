// Rotas
function registerScreen() {
  window.location.pathname = "./register.html";
}

function loginScreen() {
  window.location.pathname = "./login.html";
}

// Função para registar novo usuário e salvar no local storage
function register() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  //validação de nome
  if (!/^[a-zA-Z]+ [a-zA-Z]+/.test(name)) {
    const nameInput = document.getElementById("name");
    const errorName = document.createElement("div");
    errorName.innerHTML =
      "<p class='font-medium text-base text-red-400 mt-4 '>O nome informado é invalido</p>";
    nameInput.parentNode.insertBefore(errorName, nameInput.nextSibling);

    setTimeout(() => {
      const removeInvalidName = document.getElementsByTagName("p")[2];
      removeInvalidName.remove();
    }, 2000);

    // Retorna false para interromper a execução da função
    return false;
  }
  //validação de senha
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    )
  ) {
    const passwordInput = document.getElementById("password");
    const errorPassword = document.createElement("div");
    errorPassword.innerHTML =
      "<p class='font-medium text-base text-red-400 mt-4 '>Mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.</p>";
    passwordInput.parentNode.insertBefore(
      errorPassword,
      passwordInput.nextSibling
    );

    setTimeout(() => {
      const removeInvalidPassword = document.getElementsByTagName("p")[3];
      removeInvalidPassword.remove();
    }, 2000);

    // Retorna false para interromper a execução da função
    return false;
  }
  localStorage.setItem("name", name);
  localStorage.setItem("password", password);

  // Redireciona para a página de login
  window.location.href = "login.html";
}

const nameStorage = localStorage.getItem("name");
const passwordStorage = localStorage.getItem("password");

//Função para fazer o login
function login() {
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;

  // Verifica se o nome e a senha estão corretos
  if (
    name !== localStorage.getItem("name") ||
    password !== localStorage.getItem("password")
  ) {
    const passwordInput = document.getElementById("password");
    const nameOrPassword = document.createElement("div");
    nameOrPassword.innerHTML =
      "<p class='font-medium text-base text-red-400 mt-4 '>Nome ou senha inválidos</p>";
    passwordInput.parentNode.insertBefore(
      nameOrPassword,
      passwordInput.nextSibling
    );

    setTimeout(() => {
      const removeInvalidNameOrPassword = document.getElementsByTagName("p")[1];
      removeInvalidNameOrPassword.remove();
    }, 2000);

    // Retorna false para interromper a execução da função
    return false;
  }

  localStorage.setItem("name", name);

  // Redireciona para a página principal
  window.location.href = "panel.html";
}

function checkLogin() {
  // Recupera o nome do usuário armazenado no LocalStorage
  const name = localStorage.getItem("name");

  // Verifica se o nome do usuário existe no LocalStorage
  if (name) {
    // Renderiza o nome do usuário na página
    document.getElementById(
      "welcome"
    ).textContent = `Seja bem-vindo, ${nameStorage}!`;
  }
}

// Chama a função de verificação de login quando a página carregar
window.addEventListener("load", checkLogin);

// Renderiza o valor name salvo no localstorage na tela panel
function logout() {
  // Remove o nome do usuário do LocalStorage
  localStorage.removeItem("name");
  window.location.href = "login.html";
}

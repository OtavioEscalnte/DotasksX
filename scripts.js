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

// Renderiza o valor name salvo no localstorage na tela panel
document.getElementById(
  "welcome"
).textContent = `Seja bem-vindo, ${nameStorage}!`;

//CRUD

const form = document.getElementById("form");
const taskInput = document.getElementById("task-input");
const taskContainer = document.getElementById("task-container");
const noTaskMessage = document.getElementById("no-task-message");

let tasks = [];

function renderTasks() {
  taskContainer.innerHTML = "";
  if (tasks.length === 0) {
    noTaskMessage.classList.remove("invisible");
  } else {
    noTaskMessage.classList.add("invisible");
    tasks.forEach((task, index) => {
      const list = document.getElementById("task-container");
      list.innerHTML = `
      <div
          class="task mt-4 py-6 px-4 bg-slate-800 rounded-lg flex justify-between items-center"
        >
          <p class="text-gray-100">${task.description}</p>

          <div class="text-gray-100 flex gap-x-6">
            <button
              id="finish"
              class="flex items-center gap-x-2 hover:text-green-400 duration-300"
              data-index="${index}"
            >
              <i class="fa-regular fa-circle-check"></i><span>Concluir</span>
            </button>
            <button
              id="edit"
              class="flex items-center gap-x-2 hover:text-blue-400 duration-300"
              data-index="${index}"
            >
              <i class="fa-regular fa-pen-to-square"></i><span>Editar</span>
            </button>
            <button
              id="delete"
              class="flex items-center gap-x-2 hover:text-red-400 duration-300"
              data-index="${index}"
            >
              <i class="fa-regular fa-circle-xmark"></i><span>Excluir</span>
            </button>
          </div>
        </div>
      `;
      const btnFinish = document.getElementById("finish");
      btnFinish.addEventListener("click", () => {
        let finished = document.getElementById("finish");
        finished.classList.add("text-gray-500");
        saveTasks();
      });
      const editButton = document.getElementById("edit");
      editButton.addEventListener("click", () => {
        const newDescription = prompt(
          "Digite uma nova descrição:",
          tasks.description
        );
        if (newDescription) {
          tasks[index].description = newDescription;
          saveTasks();
          renderTasks();
        }
      });
      const deleteButton = document.getElementById("delete");
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
    });
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const description = taskInput.value.trim();
  if (description) {
    tasks.push({ description });
    saveTasks();
    taskInput.value = "";
    renderTasks();
  }
});

loadTasks();
renderTasks();

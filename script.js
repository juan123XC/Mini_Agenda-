// Seleccion de los elementos del DOM
const inputTarea = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.getElementById("agregar-btn");

botonAgregar.addEventListener("click", agregarTarea);

function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (texto !== "") {
    const li = document.createElement("li");
    li.textContent = texto;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = () => li.remove(); 

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.onclick = () => editarTarea(li); 

    li.appendChild(eliminarBtn);
    li.appendChild(editarBtn);

    li.onclick = () => li.classList.toggle("completada");

    listaTareas.appendChild(li);

    inputTarea.value = "";
  }
}

function editarTarea(li) {
  const textoOriginal = li.firstChild.textContent;

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = textoOriginal;

  li.firstChild.textContent = "";
  li.firstChild.appendChild(inputEdit);
  inputEdit.focus(); 

  inputEdit.addEventListener("blur", () => guardarEdicion(inputEdit, li, textoOriginal));
  inputEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      guardarEdicion(inputEdit, li, textoOriginal);
    }
  });
}

function guardarEdicion(inputEdit, li, textoOriginal) {
  const nuevoTexto = inputEdit.value.trim();
  if (nuevoTexto !== "") {
    li.firstChild.textContent = nuevoTexto;
  } else {
    li.firstChild.textContent = textoOriginal; 
  }

  const eliminarBtn = li.querySelector("button");
  const editarBtn = li.querySelectorAll("button")[1]; 
  li.appendChild(eliminarBtn);
  li.appendChild(editarBtn);
}
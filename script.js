// Selección de los elementos del DOM
const inputTarea = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.querySelector(".btn-agregar");

// Evento al hacer clic en el botón
botonAgregar.addEventListener("click", agregarTarea);

// Evento para agregar tarea con tecla Enter
inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

// Función para agregar nueva tarea
function agregarTarea() {
  const texto = inputTarea.value.trim();
  if (texto !== "") {
    const li = document.createElement("li");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "🗑️";
    eliminarBtn.className = "btn-eliminar";
    eliminarBtn.onclick = () => li.remove();

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "✏️";
    editarBtn.className = "btn-editar";
    editarBtn.onclick = () => editarTarea(spanTexto);

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "acciones-tarea";
    botonesDiv.appendChild(editarBtn);
    botonesDiv.appendChild(eliminarBtn);

    li.appendChild(spanTexto);
    li.appendChild(botonesDiv);

    li.onclick = (e) => {
      if (e.target === li || e.target === spanTexto) {
        li.classList.toggle("completada");
      }
    };

    listaTareas.appendChild(li);
    inputTarea.value = "";
  }
}

// Función para editar una tarea
function editarTarea(span) {
  const textoOriginal = span.textContent;

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = textoOriginal;
  span.replaceWith(inputEdit);
  inputEdit.focus();

  inputEdit.addEventListener("blur", () => guardarEdicion(inputEdit, span));
  inputEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      guardarEdicion(inputEdit, span);
    }
  });
}

// Guardar el nuevo texto editado
function guardarEdicion(inputEdit, span) {
  const nuevoTexto = inputEdit.value.trim();
  span.textContent = nuevoTexto !== "" ? nuevoTexto : span.textContent;
  inputEdit.replaceWith(span);
}

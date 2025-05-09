const inputTarea = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.querySelector(".btn-agregar");
const prioridadSelect = document.getElementById("prioridad");

window.addEventListener("DOMContentLoaded", cargarTareas);

botonAgregar.addEventListener("click", agregarTarea);

inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

function agregarTarea() {
  const texto = inputTarea.value.trim();
  const prioridad = prioridadSelect.value;

  if (texto !== "") {
    const tarea = { texto: texto, completada: false, prioridad: prioridad };
    const tareas = obtenerTareas();
    tareas.push(tarea);
    guardarTareas(tareas);
    renderizarTareas();
    inputTarea.value = "";
  }
}

function renderizarTareas() {
  listaTareas.innerHTML = "";
  const tareas = obtenerTareas();
  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("completada");
    }

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.texto;

    const prioridadIcono = document.createElement("span");
    if (tarea.prioridad === "alta") {
      prioridadIcono.textContent = "🔴";
      li.style.borderLeft = "5px solid red";
    } else if (tarea.prioridad === "media") {
      prioridadIcono.textContent = "🟡";
      li.style.borderLeft = "5px solid yellow";
    } else {
      prioridadIcono.textContent = "🟢";
      li.style.borderLeft = "5px solid green";
    }

    li.prepend(prioridadIcono);

    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "🗑️";
    eliminarBtn.className = "btn-eliminar";
    eliminarBtn.onclick = () => {
      tareas.splice(index, 1);
      guardarTareas(tareas);
      renderizarTareas();
    };

    const editarBtn = document.createElement("button");
    editarBtn.textContent = "✏️";
    editarBtn.className = "btn-editar";
    editarBtn.onclick = () => editarTarea(spanTexto, index);

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "acciones-tarea";
    botonesDiv.appendChild(editarBtn);
    botonesDiv.appendChild(eliminarBtn);

    li.appendChild(spanTexto);
    li.appendChild(botonesDiv);

    li.onclick = (e) => {
      if (e.target === li || e.target === spanTexto) {
        tarea.completada = !tarea.completada;
        guardarTareas(tareas);
        renderizarTareas();
      }
    };

    listaTareas.appendChild(li);
  });
}

function editarTarea(span, index) {
  const textoOriginal = span.textContent;

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = textoOriginal;
  span.replaceWith(inputEdit);
  inputEdit.focus();

  inputEdit.addEventListener("blur", () => guardarEdicion(inputEdit, index));
  inputEdit.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      guardarEdicion(inputEdit, index);
    }
  });
}

function guardarEdicion(inputEdit, index) {
  const tareas = obtenerTareas();
  const nuevoTexto = inputEdit.value.trim();
  if (nuevoTexto !== "") {
    tareas[index].texto = nuevoTexto;
    guardarTareas(tareas);
    renderizarTareas();
  } else {
    renderizarTareas();
  }
}

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function obtenerTareas() {
  const tareasGuardadas = localStorage.getItem("tareas");
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

function cargarTareas() {
  renderizarTareas();
}
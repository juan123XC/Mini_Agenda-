const inputTarea = document.getElementById("nueva-tarea");
const fechaInput = document.getElementById("fecha-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.querySelector(".btn-agregar");
const prioridadSelect = document.getElementById("prioridad");

window.addEventListener("DOMContentLoaded", cargarTareas);
botonAgregar.addEventListener("click", agregarTarea);

function agregarTarea() {
  const texto = inputTarea.value.trim();
  const fecha = fechaInput.value.trim();
  const prioridad = prioridadSelect.value;

  if (texto !== "") {
    const tarea = {
      texto,
      fecha,
      prioridad,
      completada: false
    };

    const tareas = obtenerTareas();
    tareas.push(tarea);
    guardarTareas(tareas);
    renderizarTareas();

    inputTarea.value = "";
    fechaInput.value = "";
    prioridadSelect.value = "alta";
  }
}

function renderizarTareas() {
  listaTareas.innerHTML = "";
  const tareas = obtenerTareas();

  tareas.sort((a, b) => {
    if (!a.fecha) return 1;
    if (!b.fecha) return -1;
    return new Date(a.fecha) - new Date(b.fecha);
  });

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("completada");
    }

    const spanTexto = document.createElement("span");
    spanTexto.textContent = tarea.texto;

    if (tarea.fecha) {
      const fechaSpan = document.createElement("span");
      fechaSpan.className = "fecha-tarea";
      fechaSpan.textContent = ` ${tarea.fecha}`;
      spanTexto.appendChild(fechaSpan);
    }

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
    editarBtn.onclick = () => editarTarea(li, tarea, index);

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "acciones-tarea";
    botonesDiv.appendChild(editarBtn);
    botonesDiv.appendChild(eliminarBtn);

    li.prepend(prioridadIcono);
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

function editarTarea(li, tarea, index) {
  const tareas = obtenerTareas();

  const inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.value = tarea.texto;
  inputEdit.classList.add("input-edicion");

  const inputFecha = document.createElement("input");
  inputFecha.type = "date";
  inputFecha.value = tarea.fecha || "";
  inputFecha.classList.add("input-edicion");

  const selectPrioridad = document.createElement("select");
  selectPrioridad.classList.add("select-edicion");
  selectPrioridad.innerHTML = `
    <option value="alta" ${tarea.prioridad === "alta" ? "selected" : ""}>Alta 🔴</option>
    <option value="media" ${tarea.prioridad === "media" ? "selected" : ""}>Media 🟡</option>
    <option value="baja" ${tarea.prioridad === "baja" ? "selected" : ""}>Baja 🟢</option>
  `;

  const guardarBtn = document.createElement("button");
  guardarBtn.textContent = "Guardar cambios";
  guardarBtn.className = "btn-guardar";
  guardarBtn.onclick = () => {
    const nuevoTexto = inputEdit.value.trim();
    const nuevaFecha = inputFecha.value;
    const nuevaPrioridad = selectPrioridad.value;

    if (nuevoTexto !== "") {
      tareas[index].texto = nuevoTexto;
      tareas[index].fecha = nuevaFecha;
      tareas[index].prioridad = nuevaPrioridad;
      guardarTareas(tareas);
      renderizarTareas();
    }
  };

  li.innerHTML = "";
  li.classList.add("editando");
  li.appendChild(inputEdit);
  li.appendChild(inputFecha);
  li.appendChild(selectPrioridad);
  li.appendChild(guardarBtn);
}

function obtenerTareas() {
  const tareasGuardadas = localStorage.getItem("tareas");
  return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
}

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  renderizarTareas();
}

const inputTarea = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.querySelector(".btn-agregar");
const fechaTarea = document.getElementById("fecha-tarea");
let calendar;

document.addEventListener("DOMContentLoaded", () => {
  const calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "es",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: []
  });
  calendar.render();
});

botonAgregar.addEventListener("click", agregarTarea);
inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") agregarTarea();
});

function agregarTarea() {
  const texto = inputTarea.value.trim();
  const fecha = fechaTarea.value;

  if (texto === "" || fecha === "") {
    alert("Por favor, completa la tarea y la fecha.");
    return;
  }

  const li = document.createElement("li");
  const spanTexto = document.createElement("span");
  spanTexto.textContent = texto;

  const spanFecha = document.createElement("span");
  spanFecha.textContent = `📅 ${fecha}`;
  spanFecha.style.fontSize = "0.8rem";
  spanFecha.style.color = "#6b7280";

  const eliminarBtn = document.createElement("button");
  eliminarBtn.textContent = "🗑️";
  eliminarBtn.className = "btn-eliminar";
  eliminarBtn.onclick = () => li.remove();

  const editarBtn = document.createElement("button");
  editarBtn.textContent = "✏️";
  editarBtn.className = "btn-editar";

  const botonesDiv = document.createElement("div");
  botonesDiv.className = "acciones-tarea";
  botonesDiv.appendChild(editarBtn);
  botonesDiv.appendChild(eliminarBtn);

  const infoDiv = document.createElement("div");
  infoDiv.appendChild(spanTexto);
  infoDiv.appendChild(spanFecha);
  infoDiv.style.display = "flex";
  infoDiv.style.flexDirection = "column";
  infoDiv.style.gap = "5px";

  li.appendChild(infoDiv);
  li.appendChild(botonesDiv);

  // Tachar tarea y desactivar edición
  li.onclick = (e) => {
    if (e.target === li || e.target === spanTexto) {
      li.classList.toggle("completada");
      editarBtn.disabled = li.classList.contains("completada");
      editarBtn.style.opacity = editarBtn.disabled ? "0.4" : "1";
      editarBtn.style.cursor = editarBtn.disabled ? "not-allowed" : "pointer";
    }
  };

  // Función de editar si no está tachada
  editarBtn.onclick = () => {
    if (!li.classList.contains("completada")) {
      editarTarea(spanTexto, spanFecha);
    }
  };

  listaTareas.appendChild(li);

  // Agregar evento al calendario
  if (calendar) {
    calendar.addEvent({
      title: texto,
      start: fecha,
      allDay: true
    });
  }

  inputTarea.value = "";
  fechaTarea.value = "";
}

function editarTarea(spanTexto, spanFecha) {
  const textoOriginal = spanTexto.textContent;
  const fechaOriginal = spanFecha.textContent.replace("📅 ", "");

  const inputNuevoTexto = document.createElement("input");
  inputNuevoTexto.type = "text";
  inputNuevoTexto.value = textoOriginal;

  const inputNuevaFecha = document.createElement("input");
  inputNuevaFecha.type = "date";
  inputNuevaFecha.value = fechaOriginal;

  const contenedor = spanTexto.parentElement;
  contenedor.innerHTML = "";
  contenedor.appendChild(inputNuevoTexto);
  contenedor.appendChild(inputNuevaFecha);

  inputNuevoTexto.focus();

  inputNuevaFecha.addEventListener("keypress", (e) => {
    if (e.key === "Enter") guardarEdicion(inputNuevoTexto, inputNuevaFecha, contenedor);
  });

  inputNuevaFecha.addEventListener("blur", () => {
    guardarEdicion(inputNuevoTexto, inputNuevaFecha, contenedor);
  });
}

function guardarEdicion(inputTexto, inputFecha, contenedor) {
  const nuevoTexto = inputTexto.value.trim();
  const nuevaFecha = inputFecha.value;

  if (nuevoTexto === "" || nuevaFecha === "") {
    alert("Ambos campos deben estar completos.");
    return;
  }

  const nuevoSpanTexto = document.createElement("span");
  nuevoSpanTexto.textContent = nuevoTexto;

  const nuevoSpanFecha = document.createElement("span");
  nuevoSpanFecha.textContent = `📅 ${nuevaFecha}`;
  nuevoSpanFecha.style.fontSize = "0.8rem";
  nuevoSpanFecha.style.color = "#6b7280";

  contenedor.innerHTML = "";
  contenedor.appendChild(nuevoSpanTexto);
  contenedor.appendChild(nuevoSpanFecha);
}

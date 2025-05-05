function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();
  if (texto !== "") {
    // Crear el nuevo elemento de lista
    const li = document.createElement("li");
    li.textContent = texto;

    // Crear el botón de eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = () => li.remove(); // Función que elimina la tarea

    // Agregar el botón de eliminar a la tarea
    li.appendChild(eliminarBtn);

    // Marcar la tarea como completada al hacer clic
    li.onclick = () => li.classList.toggle("completada");

    // Agregar la tarea a la lista de tareas
    document.getElementById("lista-tareas").appendChild(li);

    // Limpiar el input
    input.value = "";
  }
}
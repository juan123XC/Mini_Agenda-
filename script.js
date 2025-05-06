function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();
  if (texto !== "") {
    const li = document.createElement("li");
    li.textContent = texto;

    // Crear el botón de eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.onclick = () => li.remove(); 

    // Crear el botón de editar
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.onclick = () => editarTarea(li); // Función que edita la tarea

    li.appendChild(eliminarBtn);
    li.appendChild(editarBtn);

    li.onclick = () => li.classList.toggle("completada");

    document.getElementById("lista-tareas").appendChild(li);

    input.value = "";
  }
}
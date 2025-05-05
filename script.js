function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();
  if (texto !== "") {
    const li = document.createElement("li");
    li.textContent = texto;
    li.onclick = () => li.classList.toggle("completada");
    document.getElementById("lista-tareas").appendChild(li);
    input.value = "";
  }
}

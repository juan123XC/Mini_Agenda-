function agregarTarea() {
  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();
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

    document.getElementById("lista-tareas").appendChild(li);

    input.value = "";
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
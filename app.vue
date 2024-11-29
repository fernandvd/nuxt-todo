<template>
  <AppHeader />
  <div class="container mt-4">
    <h3>Lista de Tareas</h3>

    <button class="btn btn-primary" @click="createInstance" type="button">
      Crear tarea
    </button>
    <TableTodo :isLoading="isLoading" :todos="todos" @edit="editInstance" @delete="deleteInstance" />

  </div>

  <div class="modal fade" id="modalTodo" tabindex="-1" aria-labelledby="modalTodoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title fs-5" id="modalTodoLabel">
            Crear/Actualizar Tarea
          </h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveInstance">
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_titulo" class="form-label">Titulo</label>
                <input type="text" class="form-control" id="todo_titulo" v-model="instance.titulo" required>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="todo_descripcion" rows="3" v-model="instance.descripcion"></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_estado" class="form-label">Estado</label>
                <select class="form-select" aria-label="Default select example" name="todo_estado"
                  v-model="instance.estado" required>
                  <option value="" disabled>Seleccione</option>
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="PROCESO">En Proceso</option>
                  <option value="COMPLETADA">Completada</option>
                </select>
              </div>
            </div>
            <div class="row justify-content-end my-2">
              <div class="col-auto me-2">
                <button type="submit" class="btn btn-primary">
                  Guardar
                </button>
              </div>
              <div class="col-auto">
                <button type="button" @click="closeModal" class="btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';

let isLoading = ref(false);
let modal = ref(null);
let todos = ref([]);
let instance = ref({
  id: null,
  titulo: null,
  descripcion: null,
  estado: ""
});

const TODO_URL = "http://localhost:8000/api/v1/todo/todo/";

onMounted(() => {
  const modalElement = document.getElementById('modalTodo');

  // Crear una instancia del modal
  modal = new bootstrap.Modal(modalElement);
  cleanInstance();
  listTodo();
})

function listTodo() {
  isLoading.value = true;
  todos.value = [];
  axios.get(TODO_URL).then((res) => {
    todos.value = res.data;
    isLoading.value = false;
  }).catch((err) => {
    isLoading.value = false;
    alert("Ocurrio un error inesperado!")
  })
}

function closeModal() {
  modal.hide();
}

function openModal() {
  modal.show()
}

function createInstance() {
  cleanInstance();
  openModal();
}

function cleanInstance() {
  instance.value.id = null;
  instance.value.titulo = null;
  instance.value.estado = "";
  instance.value.descripcion = null;
}

function editInstance(index) {
  const newInstance = todos.value[index];
  instance.value.id = newInstance.id;
  instance.value.titulo = newInstance.titulo;
  instance.value.estado = newInstance.estado;
  instance.value.descripcion = newInstance.descripcion;
  openModal();
}

function saveInstance() {
  if (instance.value.id) {
    //update
    axios.put(TODO_URL + instance.value.id + "/", {
      titulo: instance.value.titulo,
      descripcion: instance.value.descripcion,
      estado: instance.value.estado,
    }).then(resp => {
      closeModal();
      listTodo();
    }).catch(err => {
      closeModal();
    });
  } else {
    //create
    axios.post(TODO_URL, {
      titulo: instance.value.titulo,
      descripcion: instance.value.descripcion,
      estado: instance.value.estado,
    }).then((resp) => {
      closeModal();
      listTodo();
    }).catch(err => {
      alert("Ocurrio un error inesperado")
      closeModal();
    });
  }

}

function deleteInstance(id) {
  if (confirm("¿Esta seguro de eliminar este registro?")) {
    axios.delete(TODO_URL + id + "/",).then(resp => {
      listTodo();
    }).catch(err => {
      alert("Ocurrio un error inesperado")
      closeModal();
    });
  }

}
</script>
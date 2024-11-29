<template>
  <AppHeader />
  <div class="container mt-4">
    <h3>Lista de Tareas</h3>

    <button class="btn btn-primary" @click="createInstance" type="button">
      Crear tarea
    </button>
    <TableTodo :isLoading="isLoading" :todos="todos" @edit="editInstance" @delete="deleteInstance" />

  </div>

  <ModalTodo 
  :instance="instance"
  @close="closeModal"
  @save="saveInstance"
  />
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
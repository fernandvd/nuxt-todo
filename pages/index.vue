<template>
    <div class="container mt-4">
      <h3>Lista de Tareas</h3>
  
      <div class="row">
        <div class="col-auto my-3">
          <LazySearchInput 
          v-model="search"
          @click-search="handleSearch"
          />
        </div>
      </div>
      <button type="button" class="btn btn-primary" @click="createTask">
        Crear tarea
      </button>
      <LazyTableTodo :isLoading="isLoading" :todos="todos" 
      @edit="editInstance" @delete="deleteInstance" />
  
    </div>
  
    <LazyModalTodo 
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
  let search = ref("");
  let instance = ref({
    id: null,
    titulo: null,
    descripcion: null,
    estado: ""
  });
  const router = useRouter();
  
  const TODO_URL = "http://localhost:8000/api/v1/todo/todo/";
  
  onMounted(() => {
    const modalElement = document.getElementById('modalTodo');
  
    // Crear una instancia del modal
    modal = new bootstrap.Modal(modalElement);
    cleanInstance();
    listTodo();
  })
  
  async function listTodo() {
    isLoading.value = true;
    try {
      todos.value = [];
      const data= await $fetch(TODO_URL, {
        method: "GET",
      })
      todos.value = data;
      isLoading.value = false;
    } catch (e) {
      console.error(e);
      alert("Ocurrio un error inesperado al cargar las tareas!")
      isLoading.value = false;
    }
  }
  
  function closeModal() {
    modal.hide();
  }
  
  function openModal() {
    modal.show()
  }
  
  function createTask() {
    router.push('create-task');
  }
  
  function cleanInstance() {
    instance.value.id = null;
    instance.value.titulo = null;
    instance.value.estado = "";
    instance.value.descripcion = null;
  }
  
  function editInstance(index) {
    const newInstance = todos.value[index];
    /*
    instance.value.id = newInstance.id;
    instance.value.titulo = newInstance.titulo;
    instance.value.estado = newInstance.estado;
    instance.value.descripcion = newInstance.descripcion;
    openModal();
    */

    router.push('/todo-edit-' + newInstance.id);
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
  
  async function handleSearch() {
    if (search.value) {
      const query = gql`
      {
        todoSearch (search: "${search.value}") {
          id
          titulo
          descripcion
          estado
          fechaCreacion
          fechaActualizacion
        }
      }
      `;
      const { data } = await useAsyncQuery(query)
  
      if (data.value && data.value.todoSearch) {
        isLoading.value = true;
        let newData = [];
        data.value.todoSearch.forEach(el => {
          newData.push({
            ...el,
            fecha_creacion: el.fechaCreacion,
            fecha_actualizacion: el.fechaActualizacion,
  
          })
        });
        todos.value = newData;
        isLoading.value = false;
      }
    } else {
      listTodo()
    }
  }
  </script>
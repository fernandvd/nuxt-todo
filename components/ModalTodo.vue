<template>
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
          <form @submit.prevent="$emit('save')">
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_titulo" class="form-label">Titulo</label>
                <input type="text" class="form-control" id="todo_titulo" 
                v-model="props.instance.titulo" maxlength="255" required>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="todo_descripcion" rows="3" v-model="props.instance.descripcion"></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-12 mb-2">
                <label for="todo_estado" class="form-label">Estado</label>
                <select class="form-select" aria-label="Default select example" name="todo_estado"
                  v-model="props.instance.estado" required>
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
                <button type="button" @click="$emit('close')" class="btn btn-secondary">
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

const props = defineProps({
    instance: {
        type: Object,
    }
})

defineEmits(['save', 'close'])
</script>
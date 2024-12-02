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
          <FormTodo 
          :instance="instance"
          @close="closeModal"
          @save="saveInstance"
          />
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

defineEmits(['save', 'close']);

function closeModal() {
  $emit('close'); 
}

function saveInstance() {
  $emit('save')
}
</script>
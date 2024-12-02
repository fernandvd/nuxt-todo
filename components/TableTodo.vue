<template>
    <div v-if="props.isLoading">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div class="row justify-content-center" v-if="props.todos.length>0">
            <div class="col-md-9 col-sm-12 table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Titulo</th>
                            <th scope="col">Fecha de creación</th>
                            <th scope="col">Ultima modificación</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, itemIndex) in props.todos">
                            <th scope="row">
                                {{itemIndex+1}}
                            </th>
                            <td>
                                {{ item.titulo }}
                            </td>
                            <td>
                                {{ item.fecha_creacion.slice(0, 10) }}
                            </td>
                            <td>
                                {{ item.fecha_actualizacion.slice(0, 10) }}
                            </td>
                            <td>{{ item.estado }}</td>
                            <td>
                                <div class="d-flex flex-row justify-content-around">
                                    <button type="button" class="btn btn-primary btn-sm" @click="$emit('edit', itemIndex)">
                                        <IconEdit />
                                    </button>
                                    <button type="button" class="btn btn-danger btn-sm" @click="$emit('delete', item.id)">
                                        <IconTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <h6 class="text-danger my-1" v-else>No hay tareas</h6>

    </div>

</template>
<script setup>

const props = defineProps({
    todos: {
        type: Array,
        default: [],
    },
    isLoading: {
        type: Boolean,
        default: false,
    }
});

defineEmits(['edit', 'delete'])
</script>
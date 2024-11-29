<template>
    <div class="d-flex flex-row justify-content-center">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Busqueda"
                aria-label="Recipient's search with one button addons"
                v-model="model"
                >
            <button class="btn btn-outline-primary" type="button"
            @click="$emit('click-search')"
            >
                <IconSearch />
            </button>
        </div>
    </div>
</template>
<script setup>

const model = defineModel()

defineEmits(['click-search'])
</script>
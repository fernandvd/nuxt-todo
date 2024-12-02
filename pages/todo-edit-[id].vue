<template>
    <div class="container" >
        <div class="row my-3">
            <h4 class="col fw-bold">Actualizar tarea</h4>
        </div>
        <div class="d-flex flex-row" v-if="isLoading">
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="row my-2 mx-3 justify-content-center" v-else>
            <div class="col-md-8 col-sm-12">
                <FormTodo 
                :instance="instance"
                @close="closeModal"
                @save="saveInstance"
                />

            </div>
        </div>
    </div>
</template>
<script setup>
const router = useRouter();
const route = useRoute()

let instance = ref({});
let isLoading = ref(true);

const TODO_URL = "http://localhost:8000/api/v1/todo/todo/";

onMounted(() => {
    loadData()
});

async function loadData() {
    try {
        const data = await $fetch(`${TODO_URL}${route.params.id}/`, {
            method: "GET",
        });
        if (data) {
            instance.value = data;
        }
        isLoading.value = false;
    } catch (e) {
        console.error(e)
        isLoading.value = false;
    }
}

function closeModal() {
    router.push("/")
}

function saveInstance() {
    if (instance.value.id) {
        const {data, error} = useFetch(TODO_URL + instance.value.id + "/", {
            method: 'PUT',
            body: {
                titulo: instance.value.titulo,
                descripcion: instance.value.descripcion,
                estado: instance.value.estado,
            },
        })
        if (!error.value) {
            router.push("/");
        } else {
            alert("Ocurrio un error");
            console.error(error.value);
        }
    }
}
</script>
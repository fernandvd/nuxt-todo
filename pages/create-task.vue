<template>

    <div class="container">
        <div class="row my-3">
            <h4 class="col fw-bold">Crear tarea</h4>
        </div>
        <div class="row my-2 mx-3 justify-content-center">
            <div class="col-md-8 col-sm-12">
                <LazyFormTodo 
                :instance="instance"
                @close="closeModal"
                @save="saveInstance"
                />

            </div>
        </div>
    </div>
</template>
<script setup>

let instance = ref({estado: ""});
const router = useRouter()
const TODO_URL = "http://localhost:8000/api/v1/todo/todo/";

useHead({
    title: "Crear tarea",
})

function closeModal() {
    router.push("/")
}

async function saveInstance() {
    const { data, error } = await useFetch(TODO_URL, {
        method: "POST",
        body: {
            titulo: instance.value.titulo,
            descripcion: instance.value.descripcion,
            estado: instance.value.estado,
        },
        onResponse() {
        },
        onResponseError() {          
        }
    });
    if (data.value) {
        router.push('/')
    }
    else if (error.value) {
        alert("Ocurrio un error inesperado")
    } else {
        console.log("data", data),
        console.error(error);
    }
}
</script>
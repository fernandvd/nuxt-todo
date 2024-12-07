<template>
    <section class="container mt-3">
        <h3 class="fw-bold">About this project</h3>
        <p class="text-info-emphasis">This project is a ToDo app FOR applied to job in ...</p>
        
        <div class="row justify-content-center">
            <button class="col-auto btn btn-primary" @click="goToContact">
                Go to contact page
            </button>
        </div>
    </section>
</template>
<script setup>

useHead({
    title: "About me"
})

async function goToContact() {
    await navigateTo({
        path: '/contact',
    })
}
</script>
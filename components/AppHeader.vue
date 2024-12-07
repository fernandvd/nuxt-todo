<template>

    <ul class="nav justify-content-end bg-primary-subtle py-2 px-3">
        <li class="nav-item me-3">
            <NuxtLink class="nav-link" :class="{'active': route.path=='/'}" aria-current="page" to="/">Principal</NuxtLink>
        </li>
        <li class="nav-item me-3">
            <NuxtLink class="nav-link" :class="{'active': route.path=='/create-task'}"  to="/create-task">Crer tarea</NuxtLink>
        </li>
        <li class="nav-item me-3">
            <NuxtLink class="nav-link" :class="{'active': route.path=='/about'}"  to="/about" >Acerca de </NuxtLink>
        </li>
    </ul>
</template>
<script setup>
const route = useRoute();
</script>
<style scoped>
.active {
    font-weight: 700;
}
</style>
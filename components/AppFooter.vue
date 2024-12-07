<template>
    <div class="container position-fixed bottom-0" style="left:5%">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p class="col-md-4 mb-0 text-body-secondary">© {{ YEAR }} Dave Company, Inc</p>

            <a href="/"
                class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                
            </a>

            <ul class="nav col-md-4 justify-content-end">
                
                <li class="nav-item">
                    <nuxt-link to="/" class="nav-link px-2 text-body-secondary">Principal</nuxt-link>
                </li>
                
                <li class="nav-item">
                    <nuxt-link to="/about" class="nav-link px-2 text-body-secondary">Acerca de </nuxt-link>
                </li>
            </ul>
        </footer>
    </div>
</template>
<script setup>
const YEAR = ref(new Date().getFullYear());
</script>
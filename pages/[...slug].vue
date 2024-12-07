<template>
    <div class="container my-2">
        <p class="text-danger fw-medium">
            Your be redirect to main page in {{ TIME_TO_REDIRECT}} seconds
        </p>

    </div>
</template>

<script setup>
const router = useRouter();
let TIME_TO_REDIRECT = ref(10);//in seconds

useHead({
    title: "Page not found"
});

definePageMeta({
    layout: 'not-found',
})

onMounted(() => {
    const interval = setInterval(() => {
        if (TIME_TO_REDIRECT.value > 0) {
            TIME_TO_REDIRECT.value --;
        } else {
            clearInterval(interval);
            router.push('/')
        }
    }, 1000);
})
</script>
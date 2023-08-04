<script>
import { Head } from "@inertiajs/vue3";
import HomeLayout from "../Layouts/HomeLayout.vue";

export default {
    components: {
        HomeLayout,
    },
    props: {
        canLogin: {
            type: Boolean,
        },
        canRegister: {
            type: Boolean,
        },
    },
};
</script>

<template>
    <Head>NeoX</Head>
    <HomeLayout :canLogin="canLogin" :canRegister="canRegister"> </HomeLayout>
</template>

<style></style>

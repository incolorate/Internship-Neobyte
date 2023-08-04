<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import Button from "../../../CustomComponents/Button.vue";
</script>

<template>
    <Head title="Create ad" />
    <AuthenticatedLayout>
        <template #header>
            <div class="flex">
                <Link href="/dashboard">
                    <h2
                        class="font-semibold text-xl text-gray-800 leading-tight cursor-pointer"
                    >
                        Dashboard ->
                    </h2>
                </Link>
                <h2
                    class="font-semibold text-xl text-blue-600 leading-tight cursor-pointer"
                >
                    Create ad
                </h2>
            </div>
        </template>
    </AuthenticatedLayout>
</template>

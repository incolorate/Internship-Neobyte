<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import axios from "axios";
import Button from "../CustomComponents/Button.vue";

const { user } = defineProps(["user"]);

const subscribe = async () => {
    await axios.post("http://localhost:4000/subscribe", user);
};
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dashboard
            </h2>
        </template>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <Button buttonType="primary" @click="subscribe"
                            >Subscribe</Button
                        >
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

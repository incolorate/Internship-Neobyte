<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import axios from "axios";
import Button from "../CustomComponents/Button.vue";
import { reactive, onMounted } from "vue";

const { user } = defineProps(["user"]);

const data = reactive({
    subsciribed: false,
    ads: [],
});

const subscribe = async () => {
    await axios.post("http://localhost:4000/subscribe", user);
};

onMounted(async () => {
    await axios
        .post("http://localhost:4000/subscription/check", user)
        .then((res) => {
            if (res.data === "Already subscribed") data.subsciribed = true;
        });
    if (data.subsciribed) {
        await axios.post("http://localhost:4000/newads", user).then((res) => {
            if (res.data) data.ads = res.data;
        });
    }
});
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
                        <div v-if="data.subsciribed === false">
                            <Button buttonType="primary" @click="subscribe"
                                >Subscribe</Button
                            >
                        </div>
                        <div v-if="data.subsciribed">
                            You are already subscribed
                            <p>New ads since your last visit:</p>
                        </div>
                        <div v-if="data.ads.length > 0">
                            <div
                                v-for="ad in data.ads"
                                :key="ad._id"
                                class="shadow-md bg-white min-w-full max-w-full text-slate-800 h-40 flex mt-4"
                            >
                                <div class="w-52 h-40">
                                    <img
                                        :src="ad.image"
                                        :alt="ad.title"
                                        class="p-1 w-52 h-40"
                                        loading="lazy"
                                    />
                                </div>
                                <div class="flex justify-between w-full">
                                    <div class="flex justify-between flex-col">
                                        <p class="p-1">{{ ad.title }}</p>
                                        <p class="p-1 text-sm">
                                            {{ ad.location }}
                                        </p>
                                    </div>
                                    <p class="p-2 font-bold">{{ ad.price }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

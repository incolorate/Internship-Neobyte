<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import Button from "../../../CustomComponents/Button.vue";
import { reactive, watch } from "vue";
import { router } from "@inertiajs/vue3";

const { errors, ad } = defineProps(["errors", "ad"]);

const form = reactive({
    title: ad.title,
    description: ad.description || null,
    price: ad.price,
    location: ad.location || null,
    image: ad.image || null,
});

console.log(form);
const handleSubmit = () => {
    form.price = parseInt(form.price);
    router.put(`/dashboard/ads/${ad.id}`, form);
};
</script>

<template>
    <Head title="Edit ad" />
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
                    Edit ad
                </h2>
            </div>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <form @submit.prevent="handleSubmit">
                            <div class="flex flex-col mb-4">
                                <label for="title" class="text-xl"
                                    >Title*</label
                                >
                                <input
                                    id="title"
                                    v-model="form.title"
                                    class="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                />
                                <div v-if="errors.title">
                                    {{ errors.title }}
                                </div>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label for="description" class="text-xl"
                                    >Description</label
                                >
                                <input
                                    id="description"
                                    v-model="form.description"
                                    class="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                />
                                <div v-if="errors.description">
                                    {{ errors.description }}
                                </div>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label for="price" class="text-xl"
                                    >Price*</label
                                >
                                <input
                                    id="price"
                                    v-model="form.price"
                                    class="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                    type="number"
                                />
                                <div v-if="errors.price">
                                    {{ errors.price }}
                                </div>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label for="location" class="text-xl"
                                    >Location</label
                                >
                                <input
                                    id="location"
                                    v-model="form.location"
                                    class="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                />
                                <div v-if="errors.location">
                                    {{ errors.location }}
                                </div>
                            </div>
                            <div class="flex flex-col mb-4">
                                <label for="image" class="text-xl"
                                    >Image URL</label
                                >
                                <input
                                    id="image"
                                    v-model="form.image"
                                    class="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                />
                                <div v-if="errors.image">
                                    {{ errors.image }}
                                </div>
                            </div>
                            <Button buttonType="secondary">Edit ad</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

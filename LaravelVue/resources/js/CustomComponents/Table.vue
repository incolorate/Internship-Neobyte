<script setup>
import { Link, router } from "@inertiajs/vue3";
import Modal from "../Components/Modal.vue";
import { reactive } from "vue";
import Button from "../CustomComponents/Button.vue";

const { items, headers, actions } = defineProps([
    "items",
    "headers",
    "actions",
]);

const show = reactive({
    modal: false,
});

const handleDelete = (id) => {
    router.delete(`/dashboard/ads/${id}`);
    show.modal = false;
};
</script>

<template>
    <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4"
    >
        <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
            <tr>
                <th v-for="header in headers" :key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in items"
                :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ item.title }}</td>
                <td class="truncate">{{ item.description || "-" }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.location || "-" }}</td>
                <td v-if="actions">
                    <Link :href="`/dashboard/ads/${item.id}/edit`">Edit</Link>
                    /
                    <span @click="show.modal = true" class="cursor-pointer"
                        >Delete</span
                    >

                    <Modal :show="show.modal">
                        <div class="p-7">
                            <p class="text-center mb-6">
                                Are you sure you want to delete the product?
                            </p>
                            <div class="flex gap-4 justify-center">
                                <Button
                                    buttonType="warning"
                                    @click="handleDelete(item.id)"
                                    >Yes</Button
                                >
                                <Button
                                    buttonType="primary"
                                    @click="show.modal = false"
                                    >No</Button
                                >
                            </div>
                        </div>
                    </Modal>
                </td>
            </tr>
        </tbody>
    </table>
</template>

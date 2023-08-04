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
                <td>Edit / Delete</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        headers: {
            type: Array,
            required: true,
        },
    },
};
import { FaRegularEdit } from "oh-vue-icons/icons";
</script>

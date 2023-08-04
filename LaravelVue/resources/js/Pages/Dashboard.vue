<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
import Button from "../CustomComponents/Button.vue";
import { defineProps } from "vue";
import Table from "../CustomComponents/Table.vue";

const { ads } = defineProps(["ads"]);

// You can now access 'ads' directly here or use it in the template
const headers = ["#", "Title", "Description", "Price", "Location", "Actions"];
</script>

<template>
    <Head title="Dashboard" />

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
                        <div class="flex justify-between">
                            <p>Manage your ads:</p>
                            <Link href="dashboard/ads/create">
                                <Button buttonType="primary">Create ad</Button>
                            </Link>
                        </div>
                        <div>
                            <Table
                                :headers="headers"
                                :items="ads"
                                :actions="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
const { props } = defineProps(["canLogin", "canRegister"]);
</script>

<template class="bg-red-300">
    <div class="flex items-center justify-center bg-slate-800 p-2">
        <div class="w-full max-w-5xl">
            <div class="flex justify-between p-2 text-white">
                <div>
                    <Link href="/">
                        <h1
                            class="text-xl cursor-pointer font-semibold text-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            NeoX
                        </h1>
                    </Link>
                </div>
                <div v-if="canLogin">
                    <div v-if="canLogin">
                        <Link
                            v-if="$page.props.auth.user"
                            :href="route('dashboard')"
                            class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >Dashboard</Link
                        >

                        <template v-else>
                            <Link
                                :href="route('login')"
                                class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Log in</Link
                            >

                            <Link
                                v-if="canRegister"
                                :href="route('register')"
                                class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >Register</Link
                            >
                        </template>
                    </div>
                </div>
            </div>
            <slot />
        </div>
    </div>
</template>

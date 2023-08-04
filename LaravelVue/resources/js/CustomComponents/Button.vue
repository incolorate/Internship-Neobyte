<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";

const props = defineProps({
    intent: {
        type: String,
        validator: (type) => ["primary", "secondary"].includes(type),
        default: "primary",
    },
});

const buttonClass = computed(() => {
    return cva("text-sm rounded-sm px-3 py-1", {
        variants: {
            intent: {
                primary: "bg-slate-950 text-slate-100  hover:bg-slate-700",
            },
        },
    });
});
</script>

<template>
    <button :class="buttonClass">
        <slot />
    </button>
</template>

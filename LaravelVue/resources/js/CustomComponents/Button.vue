<script setup>
import { computed } from "vue";
import { cva } from "class-variance-authority";

const props = defineProps({
    buttonType: {
        type: String,
        validator: (type) => ["primary", "secondary"].includes(type),
        default: "primary",
    },
});

const buttonClass = computed(() => {
    return cva("text-sm rounded-sm px-3 py-1", {
        variants: {
            buttonType: {
                primary: "bg-slate-950 text-slate-100  hover:bg-slate-700",
                secondary: "bg-yellow-400 text-slate-950 hover:bg-yellow-300",
                warning: "bg-red-600 text-yellow-200 hover:bg-red-700",
            },
        },
    })({
        buttonType: props.buttonType,
    });
});
</script>

<template>
    <button :class="buttonClass">
        <slot />
    </button>
</template>

<script setup>
import { Head } from "@inertiajs/vue3";
import HomeLayout from "../Layouts/HomeLayout.vue";
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { cva } from "class-variance-authority";

const props = defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    nativeAds: {
        type: Array,
        default: () => [],
    },
});

const allAds = ref(null);
const searchQuery = ref("");

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:4000/ads");
        allAds.value = [...response.data, ...props.nativeAds];
    } catch (error) {
        console.log(error);
    }
});

const filteredAds = computed(() => {
    console.log(filteredAds);
    const query = searchQuery.value.toLowerCase();
    return allAds.value?.filter((ad) => {
        return (
            ad?.title?.toLowerCase().includes(query) ||
            ad?.location?.toLowerCase().includes(query) ||
            (ad?.price && ad?.price.toString().toLowerCase().includes(query))
        );
    });
});

const imageType = ref("ro");
const showFlagSelect = ref(false);

const mainImage = computed(() => {
    return cva("", {
        variants: {
            imageType: {
                ro: "http://localhost:5173/resources/js/images/romania.png",
                uk: "http://localhost:5173/resources/js/images//uk.png",
                de: "http://localhost:5173/resources/js/images//de.png",
            },
        },
    })({
        imageType: imageType.value,
    });
});
</script>
<template>
    <Head>NeoX</Head>
    <HomeLayout :canLogin="canLogin" :canRegister="canRegister">
        <div class="">
            <img :src="mainImage" class="w-5 h-5" />
        </div>
        <div class="cursor-pointer">
            <p @click="showFlagSelect = !showFlagSelect">X</p>
            <div
                v-if="showFlagSelect"
                class="absolute bg-white"
                @click="showFlagSelect = !showFlagSelect"
            >
                <img
                    class="w-10 h-6 mb-2"
                    src="../images/de.png"
                    @click="imageType = `de`"
                />
                <img
                    class="w-10 h-6"
                    src="../images/uk.png"
                    @click="imageType = `uk`"
                />
                <img
                    class="w-10 h-6"
                    src="../images/romania.png"
                    @click="imageType = `ro`"
                />
            </div>
        </div>
    </HomeLayout>
    <div class="flex justify-center">
        <input
            type="text"
            class="w-96 outline-0 outline-none text-black"
            v-model="searchQuery"
            placeholder="Search ads..."
        />
    </div>
    <div className="flex items-center justify-center bg-slate-100">
        <div className="w-full max-w-5xl ">
            <div
                className="p-4 text-white  flex  justify-center gap-2 flex-wrap"
            >
                <div v-if="ads !== null">
                    <div
                        v-for="ad in filteredAds"
                        :key="ad._id"
                        className="shadow-md  bg-white min-w-full max-w-full text-slate-800 h-40 flex mt-4"
                    >
                        <div className="w-52 h-40">
                            <img
                                :src="ad.image"
                                alt="{title}"
                                className="p-1 w-52 h-40"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex justify-between flex-col">
                                <p className="p-1">{{ ad.title }}</p>
                                <p className="p-1 text-sm">{{ ad.location }}</p>
                            </div>
                            <p className="p-2 font-bold">{{ ad.price }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>Loading...</div>
            </div>
        </div>
    </div>
</template>

<style></style>

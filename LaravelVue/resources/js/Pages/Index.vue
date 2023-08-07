<script>
import { Head } from "@inertiajs/vue3";
import HomeLayout from "../Layouts/HomeLayout.vue";
import axios from "axios";
import { ref, computed } from "vue";

//  doar setup -> vezi props etc pt setup..
export default {
    components: {
        HomeLayout,
    },
    props: {
        canLogin: {
            type: Boolean,
        },
        canRegister: {
            type: Boolean,
        },
        nativeAds: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const ads = ref([]);
        axios
            .get("http://localhost:4000/ads")
            .then((response) => {
                ads.value = [...response.data, ...props.nativeAds];
            })
            .catch((error) => {
                console.log(error);
            });

        return {
            ads,
        };
    },
};
</script>

<template>
    <Head>NeoX</Head>
    <HomeLayout :canLogin="canLogin" :canRegister="canRegister"> </HomeLayout>
    <div className="flex items-center justify-center bg-slate-100">
        <div className="w-full max-w-5xl ">
            <div
                className="p-4 text-white  flex  justify-center gap-2 flex-wrap"
            >
                <div v-if="ads.length > 0">
                    <div
                        v-for="ad in ads"
                        :key="ad._id"
                        className="shadow-md  bg-white min-w-full max-w-full text-slate-800 h-40 flex mt-4"
                    >
                        <div className="w-52 h-40">
                            <img
                                :src="ad.image"
                                :alt="ad.title"
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

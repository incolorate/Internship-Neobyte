import AdCard from "@/Components/AdCard";
import PrimaryButton from "@/Components/PrimaryButton";
import useDebounce from "@/hooks/useDebounce";
import { Link, Head, usePage, router } from "@inertiajs/react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { FcSearch } from "react-icons/fc";

export default function Welcome({ auth }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [allAds, setAllAds] = useState();

    const debouncedSearch = useDebounce(searchQuery, 300);
    useEffect(() => {
        if (searchQuery.length > 1) {
            axios
                .get("/fetch-ads", { params: { query: searchQuery } })
                .then((response) => {
                    setAllAds(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching ads:", error);
                });
        } else {
            axios
                .get("/fetch-ads")
                .then((response) => {
                    setAllAds(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching ads:", error);
                });
        }
    }, [debouncedSearch]);

    const handleNavigation = async (url) => {
        if (searchQuery.length > 1) {
            axios
                .get(url, { params: { query: searchQuery } })
                .then((response) => {
                    setAllAds(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching ads:", error);
                });
        } else {
            axios
                .get(url)
                .then((response) => {
                    setAllAds(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching ads:", error);
                });
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center bg-slate-800">
                <div className="w-full max-w-5xl ">
                    <div className="flex justify-between p-2  text-white ">
                        <Link href="/">
                            {" "}
                            <h1 className="text-2xl font-thin">NeoX</h1>
                        </Link>
                        <div>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route("register")}
                                        className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-slate-100">
                <div className="w-full max-w-5xl ">
                    <div className="p-4 text-white ">
                        <div className="flex">
                            <div className="bg-white">
                                <label htmlFor="search">
                                    <FcSearch className="text-2xl mt-2" />
                                </label>
                            </div>
                            <form
                                className="flex flex-1"
                                onSubmit={(e) => handleInputChange(e)}
                            >
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    name="search"
                                    id="search"
                                    value={searchQuery}
                                    className="border-0 focus:outline-none outline-none w-full text-black  outline-0 border-transparent focus:border-transparent focus:ring-0"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-slate-100">
                <div className="w-full max-w-5xl ">
                    <div className="p-4 text-white  flex  justify-center gap-2 flex-wrap">
                        {allAds?.data?.map((ad) => (
                            <AdCard
                                key={ad.id}
                                title={ad.title}
                                description={ad.description}
                                author={ad.user.name}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {allAds?.links?.map((link, index) => (
                            <PrimaryButton
                                key={index}
                                onClick={() => handleNavigation(link.url)}
                                className={link.active ? "font-bold" : ""}
                            >
                                {index === 0
                                    ? "Previous"
                                    : index === allAds.links.length - 1
                                    ? "Next"
                                    : index}
                            </PrimaryButton>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

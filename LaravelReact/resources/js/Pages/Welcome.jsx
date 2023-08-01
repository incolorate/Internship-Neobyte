import AdCard from "@/Components/AdCard";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head, usePage, router } from "@inertiajs/react";
import { FcSearch } from "react-icons/fc";

export default function Welcome({ auth, ads }) {
    const { data, links } = ads;

    const handleNavigation = (url) => {
        router.replace(url);
    };
    console.log(data, links);
    return (
        <>
            <Head title="Welcome" />
            <div className="flex items-center justify-center bg-slate-800">
                <div className="w-full max-w-5xl ">
                    <div className="flex justify-between p-2  text-white ">
                        <h1 className="text-2xl font-thin">NeoX</h1>
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
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="border-0 focus:outline-none outline-none w-full text-black"
                            />
                            <PrimaryButton className="bg-white rounded-none text-black">
                                Search now
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center bg-slate-100">
                <div className="w-full max-w-5xl ">
                    <div className="p-4 text-white  flex  justify-center gap-2 flex-wrap">
                        {data.map((ad) => (
                            <AdCard
                                title={ad.title}
                                description={ad.description}
                                author={ad.user.name}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {links.map((link, index) => (
                            <PrimaryButton
                                key={index}
                                onClick={() => handleNavigation(link.url)}
                                className={link.active ? "font-bold" : ""}
                            >
                                {index === 0
                                    ? "Previous"
                                    : index === links.length - 1
                                    ? "Next"
                                    : index + 1}
                            </PrimaryButton>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

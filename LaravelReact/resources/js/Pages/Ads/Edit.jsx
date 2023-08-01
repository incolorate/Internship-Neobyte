import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Ads({ auth, ad }) {
    const { errors } = usePage().props;

    const [formData, setFormData] = useState({
        title: ad.title,
        description: ad.description,
    });

    const handleForm = (e) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        router.put(`/ads/${ad.id}`, formData);
    };

    console.log(errors);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <Link href="/ads">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            My ads
                        </h2>
                    </Link>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        {" -> "}
                    </h2>

                    <h2 className="font-semibold text-xl text-blue-600 leading-tight cursor-pointer">
                        Edit
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-2">Edit ad:</p>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="flex justify-center flex-col">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                        value={formData.title}
                                        onChange={handleForm}
                                    />
                                    {errors.title && <div>{errors.title}</div>}
                                </div>
                                <div className="flex mt-4 justify-center flex-col">
                                    <label htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        type="text"
                                        className="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                        value={formData.description}
                                        onChange={handleForm}
                                    />
                                </div>
                                <PrimaryButton className="mt-2">
                                    Edit
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

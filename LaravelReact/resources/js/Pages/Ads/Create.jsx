import { useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

const Create = ({ auth }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        event.preventDefault();

        router.post("/ads", formData);
    };

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
                    <Link href="/ads/create">
                        <h2 className="font-semibold text-xl text-blue-600 leading-tight">
                            Create
                        </h2>
                    </Link>
                </div>
            }
        >
            <Head title="My ads" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="mb-2">New ad</p>
                            <div className="flex justify-between mb-8">
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <div className="flex justify-center flex-col">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex justify-center flex-col mt-6">
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="border-b-gray-600 border-t-0 border-x-0 border-gray-300 p-2"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <PrimaryButton className="mt-2">
                                        Create
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;

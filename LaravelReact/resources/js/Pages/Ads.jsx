import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Ads({ auth, ads }) {
    const handleDelete = (id) => {
        router.delete(`ads/${id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <Link href="/ads">
                        <h2 className="font-semibold text-xl text-blue-600 leading-tight">
                            My ads
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
                            <div className="flex justify-between mb-8">
                                <p>Welcome {auth.user.name}</p>
                                <Link href="/ads/create">
                                    <PrimaryButton className="bg-yellow-400">
                                        Create ad
                                    </PrimaryButton>
                                </Link>
                            </div>

                            <div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th className="truncate">
                                                Description
                                            </th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ads.map((ad, index) => (
                                            <tr key={ad.id}>
                                                <td>{index + 1}</td>
                                                <td>{ad.title}</td>
                                                <td className="truncate">
                                                    {ad.description}
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`ads/${ad.id}/edit`}
                                                    >
                                                        Edit
                                                    </Link>
                                                    {" / "}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(ad.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

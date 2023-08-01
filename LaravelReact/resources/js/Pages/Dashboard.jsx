import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, ads }) {
    console.log(ads);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <Link href="/dashboard">
                    <h2 className="font-semibold text-xl text-blue-600 leading-tight">
                        Dashboard
                    </h2>
                </Link>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>Hello Neobyte!</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

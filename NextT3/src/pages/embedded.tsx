import { useUser } from "@clerk/nextjs";
import Layout from "~/components/Layout";
import Link from "next/dist/client/link";

export default function EmbeddedOlx() {
  const user = useUser();

  if (!user.isSignedIn) {
    return (
      <Layout>
        <p className="text-2xl text-black">
          Please
          <Link href="/login">
            <span className="text-blue-600 underline">sign in</span>
          </Link>
          to access OLX
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-black">
        <p> Welcome {user.user.primaryEmailAddress?.emailAddress}</p>
        <Link href={`/embedded/${user?.user.id}`}>
          <button className="rounded-md bg-blue-400 p-2">My account</button>
        </Link>
      </div>
    </Layout>
  );
}

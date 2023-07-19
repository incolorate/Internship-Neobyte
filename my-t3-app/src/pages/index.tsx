import { useUser } from "@clerk/nextjs";
import { use } from "react";
import Layout from "~/components/Layout";

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  console.log(user);
  if (!isLoaded) {
    return (
      <Layout>
        <h1 className="text-black">Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-black">Hello Neobyte!</h1>
      {isSignedIn ? (
        <h1 className="text-black">
          You are signed in as {user.emailAddresses[0]?.emailAddress}
        </h1>
      ) : (
        <h1 className="text-black">You are not signed in.</h1>
      )}
    </Layout>
  );
}

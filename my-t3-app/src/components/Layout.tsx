import Router from "next/router";
import Nav from "./Nav";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <Layout>
        <h1 className="text-black">Loading...</h1>
      </Layout>
    );
  }

  if (!isSignedIn) {
    return router.push("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Nav />
      <div className="m-4 min-h-full flex-grow rounded-xl bg-slate-300 bg-opacity-10 p-4 text-white">
        <div>{children}</div>
      </div>
    </div>
  );
}

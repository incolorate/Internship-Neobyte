import Nav from "./Nav";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { RedirectToSignIn } from "@clerk/nextjs";
type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Nav />
      <div className="m-4 min-h-full flex-grow rounded-xl bg-slate-300 bg-opacity-10 p-4 text-white">
        <div>{children}</div>
      </div>
    </div>
  );
}

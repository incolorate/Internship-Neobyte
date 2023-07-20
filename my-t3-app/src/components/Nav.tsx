import { RxDashboard, RxDesktop, RxHome } from "react-icons/rx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useClerk, useUser } from "@clerk/nextjs";
import { GoSignIn, GoSignOut } from "react-icons/go";
import { LuCopyCheck } from "react-icons/lu";

export default function Nav() {
  const inactive = "flex gap-2 items-center p-2";
  const active =
    inactive + " text-green-400 bg-slate-300 bg-opacity-10 rounded-xl";
  const router = useRouter();
  const { pathname } = router;

  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div className="bg-black p-4 text-white">
      <div className="mb-16 flex items-center gap-2">
        <RxDashboard className="text-3xl" />
        <h1 className="text-center text-3xl text-white">Admin Dashboard</h1>
      </div>
      <nav className="flex w-72 flex-col gap-6 p-2 text-white">
        <Link href="/" className={pathname === "/" ? active : inactive}>
          <RxHome className="text-center text-2xl" />
          <p className="text-center text-2xl">Home</p>
        </Link>
        <Link
          href="/users"
          className={pathname.includes("users") ? active : inactive}
        >
          <RxDesktop className="text-center text-2xl" />
          <p className="text-center text-2xl">Users</p>
        </Link>
        <Link
          href="/validateapis"
          className={pathname.includes("users") ? active : inactive}
        >
          <LuCopyCheck className="text-center text-2xl" />
          <p className="text-center text-2xl">Validate Apis</p>
        </Link>
        {isSignedIn && (
          <div className="flex items-center gap-2 p-2">
            <GoSignOut className="text-center text-2xl" />
            <button onClick={() => signOut()}>
              <p className="text-center text-2xl">Sign out</p>
            </button>
          </div>
        )}
        {!isSignedIn && (
          <div>
            <Link
              href="/login"
              className={pathname.includes("signup") ? active : inactive}
            >
              <GoSignIn className="text-center text-2xl" />
              <p className="text-center text-2xl">Sign in</p>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

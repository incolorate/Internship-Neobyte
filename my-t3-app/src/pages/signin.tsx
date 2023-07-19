import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // start the sign In process.
  const generateCode = () => {
    let arr = [];
    for (let i = arr.length; i < 6; i++) {
      const number = Math.floor(Math.random() * 10);
      if (arr[i - 1] + 1 !== number && arr[i - 1] !== number) {
        arr.push(number);
      }
    }
    return arr.join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
      generateCode();
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  const user = useUser();
  console.log(user);
  return (
    <div>
      {!user.isSignedIn && (
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button onClick={handleSubmit}>Sign In</button>
        </form>
      )}
      {user.isSignedIn && (
        <div>
          you are signed in
          <SignOutButton />
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Link from "next/dist/client/link";
import { api } from "~/utils/api";
import LoginComponent from "~/components/LoginComponent";

type User = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [userFrom, setUserForm] = useState<User>({ email: "", password: "" });
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);

  const login = api.example.handleLogin.useMutation();

  const handleFormChange = (e) => {
    setUserForm({ ...userFrom, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login.mutate({
        email: userFrom.email,
        password: userFrom.password,
      });
      console.log(login.data);
    } catch (error) {
      console.log(error);
    }
    setPendingVerification(true);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        {!pendingVerification && (
          <LoginComponent handleFormChange={handleFormChange} />
        )}
      </div>
    </>
  );
}

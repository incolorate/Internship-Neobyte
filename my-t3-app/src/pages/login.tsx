import { useEffect, useState } from "react";
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
  const [validationCode, setValidationCode] = useState<string>("");

  const login = api.example.handleLogin.useMutation();

  const handleFormChange = (e) => {
    setUserForm({ ...userFrom, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      login.mutate({
        email: userFrom.email,
        password: userFrom.password,
      });
    } catch (error) {
      console.log(error);
    }

    setPendingVerification(true);
  };

  // Get official validation code
  useEffect(() => {
    setValidationCode(login.data);
  }, [login]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to Neobyte
          </h2>
        </div>
        {!pendingVerification && (
          <LoginComponent
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Link from "next/dist/client/link";
import { api } from "~/utils/api";
import LoginComponent from "~/components/LoginComponent";
import LoginValidation from "~/components/LoginValidation";
import { error } from "console";

type User = {
  email: string;
  password: string;
};

export default function SignInForm() {
  const [userFrom, setUserForm] = useState<User>({ email: "", password: "" });
  const [pendingVerification, setPendingVerification] =
    useState<boolean>(false);
  const [validationCode, setValidationCode] = useState<string>("");
  const [userValidationCode, setUserValidationCode] = useState<string>("");
  const [invalidCode, setInvalidCode] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(60);

  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const login = api.example.handleLogin.useMutation();
  const validateCode = api.example.codeVerification.useMutation();

  const handleFormChange = (e) => {
    setUserForm({ ...userFrom, [e.target.name]: e.target.value });
  };

  const handleUserValidationCode = (e) => {
    setUserValidationCode(e.target.value);
  };

  // Validation logic
  const handleValidationSubmit = async (e) => {
    e.preventDefault();

    const sendDate = Date.now();
    try {
      const serverValidation = await validateCode.mutateAsync({
        email: userFrom.email,
        sendAt: sendDate,
      });
    } catch (error) {
      throw error;
    }

    if (validationCode !== userValidationCode) {
      setInvalidCode(true);
    } else {
      if (!isLoaded) {
        return;
      }
      try {
        const result = await signIn.create({
          identifier: userFrom.email,
          password: userFrom.password,
        });
        if (result.status === "complete") {
          console.log(result);
          await setActive({ session: result.createdSessionId });
          setInvalidCode(false);
          router.push("/");
        } else {
          /*Investigate why the login hasn't completed */
          console.log(result);
        }
      } catch (err: any) {
        console.error("error", err.errors[0].longMessage);
      }
    }
  };

  // Login validation
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
    setCounter(60);
  };

  // Get official validation code
  useEffect(() => {
    setValidationCode(login.data);
  }, [login]);

  // Countdown
  useEffect(() => {
    if (pendingVerification) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, pendingVerification]);
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
        {pendingVerification && (
          <LoginValidation
            handleUserValidationCode={handleUserValidationCode}
            handleValidationSubmit={handleValidationSubmit}
            handleSendNewCode={handleFormSubmit}
            invalidCode={invalidCode}
            countDown={counter}
          />
        )}
      </div>
    </>
  );
}

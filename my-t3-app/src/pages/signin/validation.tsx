import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function Validation() {
  const [validationCode, setValidationCode] = useState("");
  const { isLoaded, signIn, setActive } = useSignIn();
  const sessionCode = api.example.handleValidation.useQuery({
    validation: validationCode,
  });
  const handleSubmit = async (e) => {};

  return (
    <div className="mt-2">
      <form onSubmit={handleSubmit}>
        <input
          id="validation  "
          name="validation"
          type="text"
          autoComplete="validation"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => setValidationCode(e.target.value)}
          max={6}
          min={6}
        />
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

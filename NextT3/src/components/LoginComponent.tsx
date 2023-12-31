import Link from "next/dist/client/link";

type LoginComponentProps = {
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loginData: {
    data: any; // The type of data returned by the login mutation, you can replace 'any' with the actual type if you have it available
    isLoading: boolean;
    isError: boolean;
    error?: { message: string }; // Add the error property with an optional error object
  };
};

export default function LoginComponent({
  handleFormChange,
  handleFormSubmit,
  loginData,
}: LoginComponentProps) {
  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleFormChange(e)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleFormChange(e)}
              />
            </div>
            {loginData.error && (
              <p className="text-red-500">{loginData.error.message || ""}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <Link href="/signup">
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              {" "}
              SignUp!
            </span>
          </p>
        </Link>
      </div>
    </>
  );
}

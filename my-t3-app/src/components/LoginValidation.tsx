export default function LoginValidation({
  handleUserValidationCode,
  handleValidationSubmit,
  handleSendNewCode,
  invalidCode,
  countDown,
}) {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleValidationSubmit}>
        <div>
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {countDown > 0 ? (
              `Code available for: ${countDown}`
            ) : (
              <button className="text-blue-500" onClick={handleSendNewCode}>
                Send new code
              </button>
            )}
          </h2>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Validation code
          </label>
          <div className="mt-2">
            <input
              id="validation"
              name="validation"
              type="text"
              autoComplete="validation"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => handleUserValidationCode(e)}
            />
          </div>
        </div>
        {invalidCode && <p className="text-red-500">Invalid code</p>}
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-500"
            disabled={countDown === 0 ? true : false}
          >
            Validate
          </button>
        </div>
      </form>
    </div>
  );
}

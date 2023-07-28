import { useState } from "react";
import { api } from "~/utils/api";

export default function TextForm(user) {
  const [textMessage, setTextMessage] = useState<string>("");
  const createText = api.example.createPost.useMutation({});

  console.log(user);
  const userEmail = user.user.primaryEmailAddress.emailAddress;
  const userId = user.user.id;
  console.log(userEmail);

  return (
    <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
        <textarea
          id="chat"
          rows="1"
          className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Your message..."
          value={textMessage}
          onChange={(e) => setTextMessage(e.target.value)}
        ></textarea>
        <button
          onClick={() =>
            createText.mutate({
              postText: textMessage,
              userId,
              userEmail,
              createdAt: Date.now().toLocaleString(),
            })
          }
          type="submit"
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        >
          <svg
            className="h-5 w-5 rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </form>
  );
}

import { useState } from "react";
import Layout from "~/components/Layout";
import { BiDownArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

export default function OlxUser() {
  const [showAdForm, setShowAdForm] = useState(false);
  const [showMyAds, setShowMyAds] = useState(false);
  const [ad, setAd] = useState({});
  const [count, setCount] = useState({});
  const user = useUser();

  const handleFormChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };
  const handleContentLength = (e) => {
    setCount({ ...count, [e.target.name]: e.target.value.length });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCount({ title: "", description: "" });
    setAd({ title: "", description: "" });
    setShowAdForm(!showAdForm);
  };

  const createPost = api.example.createPost.useMutation();

  const handleCreatePost = (e) => {
    e.preventDefault();
    createPost.mutateAsync({
      userId: user.user?.id,
      postText: ad.description,
      createdAt: Date.now().toLocaleString(),
      postTitle: ad.title,
      userEmail: user.user?.primaryEmailAddress?.emailAddress,
    });
  };

  return (
    <Layout>
      <div
        className="flex rounded-md bg-slate-200 p-2 text-black"
        onClick={() => setShowAdForm(!showAdForm)}
      >
        <div className="mt-1">
          {showAdForm ? <BiDownArrowAlt /> : <BiRightArrowAlt />}
        </div>
        <p>Create new add</p>
      </div>
      {showAdForm && (
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Ad title"
                        value={ad.title}
                        onChange={(e) => {
                          handleContentLength(e);
                          handleFormChange(e);
                        }}
                      />
                    </div>
                    {count.title > 65 ? (
                      <p className="text-sm text-red-600">Title to long</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="Description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Ad Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="Description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={(e) => {
                        handleContentLength(e);
                        handleFormChange(e);
                      }}
                      value={ad.description}
                    />
                    {count.description > 255 ? (
                      <p className="text-sm text-red-600">
                        Maximum description length 255 characters
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                  onClick={(e) => handleCancel(e)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => handleCreatePost(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <div
        className="mt-2 flex rounded-md bg-slate-200 p-2 align-middle text-black"
        onClick={() => setShowMyAds(!showMyAds)}
      >
        <div className="mt-1">
          {showMyAds ? <BiDownArrowAlt /> : <BiRightArrowAlt />}
        </div>
        <p>Show my ads</p>
      </div>
    </Layout>
  );
}

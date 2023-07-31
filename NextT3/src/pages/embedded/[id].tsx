import { useState } from "react";
import Layout from "~/components/Layout";
import {
  BiDownArrowAlt,
  BiEdit,
  BiRightArrowAlt,
  BiTrashAlt,
} from "react-icons/bi";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { createId } from "@paralleldrive/cuid2";

export default function OlxUser() {
  const [showAdForm, setShowAdForm] = useState(false);
  const [showMyAds, setShowMyAds] = useState(false);
  const [ad, setAd] = useState({});
  const [count, setCount] = useState({});
  const [success, setSuccess] = useState(false);
  const user = useUser();
  const router = useRouter();

  const handleFormChange = (e) => {
    setAd({ ...ad, [e.target.name]: e.target.value });
  };

  const handleContentLength = (e) => {
    setCount({ ...count, [e.target.name]: e.target.value.length });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCount({ title: 0, description: 0 });
    setAd({ title: "", description: "" });
    setShowAdForm(!showAdForm);
  };

  const createPost = api.example.createEmbeddedAd.useMutation();

  const getAds = api.example.getEmbeddedAds.useQuery({
    userId: router.query.id,
  });
  let myAds;

  if (getAds.isSuccess) {
    myAds = JSON.parse(getAds.data.ads);
  }

  console.log(myAds);
  const handleCreatePost = async (e) => {
    const adsJSON = [
      ...myAds,
      {
        title: ad.title,
        description: ad.description,
        id: createId(),
      },
    ];

    e.preventDefault();
    try {
      await createPost.mutateAsync({
        userId: user.user?.id,
        ads: JSON.stringify(adsJSON),
      });
      setCount({ title: 0, description: 0 });
      setAd({ title: "", description: "" });
      setSuccess(true);
      await getAds.refetch();
    } catch (error) {
      console.log(error);
    }
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
          {success && (
            <p className="text-green-300">The ad was created successfully</p>
          )}
          {createPost.error ? (
            <p className="text-red-600">Something went wrong</p>
          ) : (
            ""
          )}
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
      <div>
        {showMyAds && (
          <table className="mt-2 w-full table-fixed text-xl text-black">
            <thead className="bg-zinc-300">
              <tr>
                <td>#</td>
                <td>Title</td>
                <td>Description</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {myAds.map((ad, index) => {
                return (
                  <tr key={ad.id}>
                    <td>{index + 1}</td>
                    <td>{ad.title}</td>
                    <td className="truncate">{ad.description}</td>
                    <td>
                      <Link href={`${router.asPath}/${ad.id}`}>
                        <BiEdit />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

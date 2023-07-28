import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import PostCard from "~/components/PostCard";
import TextForm from "~/components/TextForm";
import { api } from "~/utils/api";

export default function Twitter() {
  const user = useUser();
  const [userEmail, setUserEmail] = useState("");
  const allPosts = api.example.findPostsByEmail.useMutation();
  return (
    <Layout>
      <div className=" bg-slate-800">
        <div className="maw-w-screen-md">
          <p className="text-2xl text-white">
            Welcome{" "}
            <strong>{user?.user?.emailAddresses[0]?.emailAddress}</strong>
          </p>
          <div className="mt-12 flex h-full w-full justify-center gap-6">
            <p className="p-2 text-2xl">Post something</p>
            <TextForm user={user.user} />
          </div>
        </div>
        <div className="mt-8 border border-t-2 border-teal-800 text-center">
          <p className="text-2xl">Find posts</p>
          <div>
            <input
              type="text"
              placeholder="User email"
              className="p-2 text-black"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <button
              onClick={() => {
                allPosts.mutate({ userEmail });
              }}
            >
              Find posts
            </button>
          </div>
          <div>
            {allPosts?.data?.map((post) => (
              <PostCard postData={post} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

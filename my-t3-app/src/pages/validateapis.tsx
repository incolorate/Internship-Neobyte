import { useState } from "react";
import Layout from "~/components/Layout";
import axios from "axios";

export default function ValidateApis() {
  const [textAreaValue, setTextAreaValue] = useState("");

  const handlePost = async () => {
    const data = axios.post;
  };

  return (
    <Layout>
      <div className="rounded-md border-2 border-slate-500 bg-slate-800 p-4 text-slate-200">
        <div className="rounded-md border-2 border-slate-500">
          <select className="bg-slate-900 text-2xl text-green-500">
            <option className="bg-none">POST</option>
            <option>GET</option>
          </select>
          <input
            id="url"
            name="url"
            type="text"
            autoComplete="url"
            required
            className="w-5/12 bg-slate-700 p-2 outline-none"
          ></input>
          <button className="bg-purple-500 p-2 px-9">Send</button>
        </div>
        <div>
          <p className="mt-4 text-2xl">JSON:</p>
        </div>
        <div>
          <textarea className="min-h-screen w-full border-2 border-slate-500 bg-slate-800 align-text-top outline-none" />
        </div>
      </div>
    </Layout>
  );
}

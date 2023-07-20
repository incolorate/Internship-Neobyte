import { useState } from "react";
import Layout from "~/components/Layout";
import axios from "axios";

export default function ValidateApis() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [accessLink, setAccesLink] = useState("http://localhost:4000/");

  const [response, setResponse] = useState<object>({});
  const [responseTime, setResponseTime] = useState("");
  const [errorData, setErrorData] = useState<object>({});

  const handleTextArea = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleGet = async () => {
    const start = Date.now();
    const data = await axios.get(accessLink);
    const end = Date.now();
    setResponseTime(end - start);
    setResponse({ ...data });
    console.log(response);
  };

  const handlePost = async () => {
    const start = Date.now();
    const dataToSend = JSON.parse(textAreaValue);

    //axios expects an object

    axios
      .post("http://localhost:4000/user/login", dataToSend)
      .then(function (response) {
        setResponse({ ...response });
      })
      .catch(function (error) {
        console.log(error);
        setResponse({ ...error });
      });

    const end = Date.now();
    setResponseTime(end - start);
  };

  console.log("you are here", response);

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2 rounded-md border-2 border-slate-500 bg-slate-800 p-4 text-slate-200">
        <div>
          <div className="flex rounded-md border-2 border-slate-500">
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
              className="flex-1 bg-slate-700 p-2 outline-none"
            ></input>
            <button className="bg-purple-500 p-2 px-9" onClick={handlePost}>
              Send
            </button>
          </div>
          <div>
            <p className="mt-4 text-2xl">JSON:</p>
          </div>
          <div>
            <textarea
              value={textAreaValue}
              onChange={handleTextArea}
              className="min-h-screen w-full border-2 border-slate-500 bg-slate-800 p-4 align-text-top outline-none"
            />
          </div>
        </div>
        <div className="">
          <div className="flex gap-6 border-2 border-slate-500">
            <p className="p-2">
              {response.status &&
                `${response.response.status} ${response.response.statusText}`}
            </p>
            <p className="bg-slate-700 p-2 px-4">{responseTime} ms</p>
          </div>
          <div>
            <p className="mt-4 text-2xl">Preview:</p>
          </div>
          <div className="min-h-screen w-full border-2 border-slate-500 p-4">
            {response.data && response.response.data}
          </div>
        </div>
      </div>
    </Layout>
  );
}

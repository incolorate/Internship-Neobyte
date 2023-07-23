import { useState } from "react";
import Layout from "~/components/Layout";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function ValidateApis() {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [accessLink, setAccesLink] = useState("");
  const [requestType, setRequestType] = useState("get");
  // Store data from request
  const [response, setResponse] = useState<object>({});
  const [responseTime, setResponseTime] = useState<number>();

  const handleGet = async () => {
    // Data to json -> object this way i did not encounter any problems with sending data
    const dataToJSON = JSON.stringify(textAreaValue);
    const dataToSend = JSON.parse(dataToJSON);

    const start = Date.now();

    let data: AxiosResponse;
    let errorData: AxiosError;
    await axios
      .get(accessLink, dataToSend)
      .then(function (response) {
        data = response;
      })
      .catch(function (error) {
        errorData = error.response;
      });

    const end = Date.now();
    setResponseTime(end - start);
    setResponse({
      currentDate: new Date().toLocaleString(),
      status: data?.status || errorData?.status,
      statusText: data?.statusText || errorData?.statusText,
      responseTime,
      data: data?.data || "Cannot GET",
      url: `Access link ${accessLink}`,
    });
    await axios.post("/api/apilog", response);
  };

  const handlePost = async () => {
    const start = Date.now();
    try {
      JSON.parse(textAreaValue);
    } catch (e) {
      setResponse({ data: "Invalid JSON" });
      return false;
    }
    //axios expects an object

    let data: AxiosResponse;
    let errorData: AxiosError;
    await axios
      .post(accessLink, JSON.parse(textAreaValue))
      .then(function (response) {
        data = response;
      })
      .catch(function (error) {
        errorData = error.response;
      });

    const end = Date.now();
    setResponseTime(end - start);

    setResponse({
      currentDate: new Date().toLocaleString(),
      status: data?.status || errorData?.status,
      statusText: data?.statusText || errorData?.statusText,
      responseTime,
      data: data?.data || "Cannot POST",
    });
    await axios.post("/api/apilog", response);
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2 rounded-md border-2 border-slate-500 bg-slate-800 p-4 text-slate-200">
        <div>
          <div className="flex rounded-md border-2 border-slate-500">
            <select
              className="bg-slate-900 text-2xl text-green-500"
              onChange={(e) => setRequestType(e.target.value)}
              value={requestType}
            >
              <option value="post">POST</option>
              <option value="get">GET</option>
            </select>
            <input
              id="url"
              name="url"
              type="text"
              autoComplete="url"
              required
              className="flex-1 bg-slate-700 p-2 outline-none"
              value={accessLink}
              onChange={(e) => setAccesLink(e.target.value)}
            ></input>
            <button
              className="bg-purple-500 p-2 px-9"
              onClick={requestType === "get" ? handleGet : handlePost}
              disabled={accessLink.length === 0 ? true : false}
            >
              Send
            </button>
          </div>
          <div>
            <p className="mt-4 text-2xl">JSON:</p>
          </div>
          <div>
            <textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              className="min-h-screen w-full border-2 border-slate-500 bg-slate-800 p-4 align-text-top outline-none"
            />
          </div>
        </div>
        <div className="">
          <div className="flex gap-6 border-2 border-slate-500">
            <p className="p-2">
              {response.status} {response.statusText}
            </p>
            <p className="bg-slate-700 p-2 px-4">{responseTime} ms</p>
          </div>
          <div>
            <p className="mt-4 text-2xl">Preview:</p>
          </div>
          <div className="min-h-screen w-full border-2 border-slate-500 p-4">
            <pre className="min-h-screen">
              {JSON.stringify(response.data, undefined, 2) ?? ""}
            </pre>
          </div>
        </div>
      </div>
    </Layout>
  );
}

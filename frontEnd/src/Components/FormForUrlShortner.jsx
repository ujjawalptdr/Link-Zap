import React, { useState } from "react";
import axios from "axios";
import { TbLoader } from "react-icons/tb";
import CopyButton from "./CopyButton";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";

const serverUrl = "https://link-zap.onrender.com";

const FormForUrlShortner = ({ shortenedUrl, setShortenedUrl }) => {
  const [fullUrl, setFullUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${serverUrl}/url/postUrl`,
        { orignalURL: fullUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        setShortenedUrl(`${serverUrl}/${res?.data?.shortId}`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-transparent">
      <h1 className="text-4xl font-bold text-white mb-6 text-center">
        Generate <span className="text-themeOrange">ShortURL</span>
      </h1>

      <form onSubmit={onSubmitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your FullURL here..."
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-2 px-4 py-3 text-white font-semibold rounded-lg transition duration-300
        ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-orange-600 hover:brightness-110"
            }`}
        >
          {isLoading ? (
            <>
              <TbLoader className="animate-spin size-5" />
              Shortening...
            </>
          ) : (
            "Shorten URL"
          )}
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-6 p-4 rounded-lg bg-green-100 text-green-800 shadow-md transition-all duration-500 animate-fadeInUp">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Shortened URL</p>
            <IoClose
              size={20}
              className="cursor-pointer hover:text-red-500"
              onClick={() => setShortenedUrl("")}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <a
              href={shortenedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all hover:text-blue-800"
            >
              {shortenedUrl}
            </a>
            <CopyButton textToCopy={shortenedUrl} />
          </div>
        </div>
      )}
    </div>

  );
};

export default FormForUrlShortner;
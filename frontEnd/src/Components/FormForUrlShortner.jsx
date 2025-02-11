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
    <div className="max-w-lg mx-auto mt-20 p-6  shadow-xl shadow-slate-500 rounded-lg bg-transparent">
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Generate <span className="text-themeOrange">ShortURL</span>
      </h1>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your FullURL here..."
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-orange-400 transition"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-4 px-4 py-2 text-white font-medium rounded-lg transition 
          ${isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-orange-600 hover:bg-slate-600"
            }`}
        >
          {isLoading ? (
            <span className="flex justify-center items-center gap-2">
              <TbLoader className="animate-spin size-6" />
              Shortning..
            </span>
          ) : (
            "Shorten URL"
          )}
        </button>
      </form>

      {shortenedUrl && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center transition-all duration-500 ease-out transform opacity-0 translate-y-[-10px] animate-show">
          <div className="flex justify-center">
            <p className="flex-1 ml-4">Shortened URL</p>
            <div className=" items-end " ><IoClose size={20} className="cursor-pointer" onClick={() => setShortenedUrl("")} /></div>

          </div>
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            {shortenedUrl}
          </a>
          <CopyButton textToCopy={shortenedUrl} /> {/* Add CopyButton */}
        </div>
      )}
    </div>
  );
};

export default FormForUrlShortner;
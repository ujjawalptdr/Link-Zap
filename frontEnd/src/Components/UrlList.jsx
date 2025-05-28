import React, { useContext, useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { UserContext } from "./Contexts/UserContext";
import { toast } from "sonner";
import { useUrlContext } from "./Contexts/UrlContext";


const serverUrl = "https://link-zap.onrender.com";

const UrlList = ({ shortenedUrl }) => {
    const { urlList, setUrlList } = useUrlContext();
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${serverUrl}/url/get`, {
                    withCredentials: true, // Add this option to send credentials (cookies, etc.)
                });
                if (res) {
                    setUrlList(res.data.urls);
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message || "No Internet Connection");
            } finally {
                setLoading(false);
            }
        }

        if (user) {
            fetchData();
        }

    }, [user, shortenedUrl])

    const handleDeleteUrl = async (shortIdToDelete) => {
        try {
            const res = await axios.delete(`${serverUrl}/url/${shortIdToDelete}`, {
                withCredentials: true, // Add this option to send credentials (cookies, etc.)
            });

            if (res) {
                // Immediately remove the deleted URL from the list
                setUrlList((prevUrls) => prevUrls.filter((url) => url.shortId !== shortIdToDelete));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (

        <div className="h-full max-w-7xl px-4 py-10 lg:p-14 mt-5 mx-auto bg-transparent">
            {
                loading ? (
                    <div className="flex justify-center items-center h-48">
                        <BiLoaderAlt className="w-16 h-16 text-slate-400 animate-spin" />
                    </div>
                ) : urlList.length !== 0 ? (
                    <div>
                        <h1 className="text-3xl lg:text-4xl text-themeOrange font-bold mb-6 sm:px-10 lg:px-0">
                            <span className="text-white">My</span> URLs
                        </h1>

                        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                            {
                                urlList.map((url) => (
                                    <div key={url._id} className="bg-white shadow-lg shadow-gray-400 hover:shadow-xl hover:shadow-gray-400 transition duration-300 rounded-lg p-6 flex flex-col justify-between hover:scale-105">
                                        <div className="flex flex-col gap-4">
                                            {/* Full URL */}
                                            <p className="break-all text-gray-700 text-sm">
                                                <span className="text-orange-600 font-semibold">Full URL:</span> {url.redirectURL}
                                            </p>

                                            {/* Short URL */}
                                            <div className="flex items-center justify-between gap-4">
                                                <p className="break-all text-sm text-gray-700 w-full">
                                                    <span className="text-green-600 font-semibold">Short URL:</span>{" "}
                                                    <a
                                                        href={`${serverUrl}/${url.shortId}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {`${serverUrl}/${url.shortId}`}
                                                    </a>
                                                </p>
                                                <CopyButton textToCopy={`${serverUrl}/${url.shortId}`} />
                                            </div>

                                            {/* Total Clicks */}
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-800">Total Clicks:</span>{" "}
                                                <span className="text-red-600 font-bold">{url.totalClicks}</span>
                                            </p>
                                        </div>

                                        {/* Delete Button */}
                                        <div className="flex justify-end mt-4">
                                            <button
                                                onClick={() => handleDeleteUrl(url.shortId)}
                                                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition duration-200"
                                                title="Delete URL"
                                            >
                                                <MdDelete className="text-red-600" size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-20">
                        <p>No URLs found. Start by creating one!</p>
                    </div>
                )
            }
        </div>


    );
};

export default UrlList;

import React, { useContext, useEffect, useState } from "react";
import CopyButton from "./CopyButton";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";
import { UserContext } from "./Contexts/UserContext";
import { toast } from "sonner";
import { useUrlContext } from "./Contexts/UrlContext";


const serverUrl = "http://localhost:8000";

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
                (urlList.length != 0) ?
                    <div>
                        <h1 className="text-3xl lg:text-4xl text-themeOrange font-bold  mb-6 sm:px-10 lg:px-0">
                            <span className="text-white">My</span> URLs
                        </h1>

                        <div className="mx-auto lg:px-2 flex justify-center">
                            {
                                loading && <BiLoaderAlt className="size-20 animate-spin text-slate-400 mt-20" />
                            }
                            <div className="grid gap-8 lg:gap-x-12 lg:grid-cols-2">
                                {
                                    urlList ?
                                        urlList.map((url) => {
                                            return <div key={url._id} className="lg:max-w-xl bg-white shadow-xl px-6 py-6 rounded-md ">
                                                <div className="flex flex-col gap-4">
                                                    {/* Full URL */}
                                                    <p className="break-all">
                                                        <span className="text-orange-500 text-lg font-bold">
                                                            Full-URL:
                                                        </span>{" "}
                                                        {url.redirectURL}

                                                    </p>
                                                    {/* Short URL */}
                                                    <div className="flex items-center justify-between gap-4">
                                                        <p className="break-all w-full">
                                                            <span className="text-green-500 text-lg font-bold">
                                                                Short-URL:
                                                            </span>{" "}
                                                            <a
                                                                href={`${serverUrl}/${url.shortId}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className=" hover:underline break-all"
                                                            >
                                                                {`${serverUrl}/${url.shortId}`}
                                                            </a>
                                                        </p>
                                                        <CopyButton textToCopy={`${serverUrl}/${url.shortId}`} />
                                                    </div>
                                                    {/* Total Clicks */}
                                                    <p>
                                                        <span className="font-bold text-black">Total-Clicks:</span> <span className="text-red-500 font-bold text-lg font-sans">{url.totalClicks}</span>
                                                    </p>
                                                    <div className="flex justify-end ">
                                                        <button onClick={() => handleDeleteUrl(url.shortId)} className=" p-2 rounded-md shadow-md shadow-red-300"><MdDelete color="red" size={20} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        ) : null
                                }

                            </div>
                        </div>
                    </div> : null
            }
        </div >

    );
};

export default UrlList;

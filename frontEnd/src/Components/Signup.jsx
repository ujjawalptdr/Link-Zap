import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios"; // Ensure axios is installed and imported
import { serverUrl } from "../helpers/Constants";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Signup = ({ setLogin, login, signup, setSignup }) => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const inputHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevents default form submission

        try {
            const res = await axios.post(`${serverUrl}/user/register`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res) {
                toast.success(res.data.message);
                setLogin(true);
                setSignup(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            {/* Motion div with fade and slide-up animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-2xl w-11/12 sm:w-96 lg:w-96"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-white">Signup</h2>
                    <IoClose
                        size={30}
                        onClick={() => setSignup(!signup)}
                        className="cursor-pointer text-white hover:text-gray-200 transition"
                    />
                </div>

                <form onSubmit={onSubmitHandler}>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-200 text-lg font-medium mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            value={formData.fullname}
                            onChange={inputHandler}
                            type="text"
                            name="fullname"
                            className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-xl bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-gray-200 text-lg font-medium mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            value={formData.email}
                            onChange={inputHandler}
                            type="email"
                            name="email"
                            className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-xl bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-200 text-lg font-medium mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            value={formData.password}
                            onChange={inputHandler}
                            type="password"
                            name="password"
                            className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-xl bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all"
                    >
                        Signup
                    </button>
                </form>
                <div className="mt-5 text-sm text-white">If you already have an Account, <span className="font-semibold text-black text-base cursor-pointer hover:underline" onClick={() => { setSignup(false); setLogin(true) }}>Login</span></div>
            </motion.div>
        </div>
    );
};

export default Signup;

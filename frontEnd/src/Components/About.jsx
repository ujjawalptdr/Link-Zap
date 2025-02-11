import React from 'react';

const About = () => {
    return (
        <div className="bg-transparent text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        About <span className="text-themeOrange">LinkZap</span>
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        LinkZap is your go-to solution for shortening, sharing, and managing URLs effortlessly. Whether you’re a business looking to track analytics or an individual simplifying your links, LinkZap has you covered.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-8 bg-white text-gray-800 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Fast & Easy</h3>
                        <p className="mt-4 text-gray-600">
                            Create shortened URLs in just a few clicks and share them instantly. LinkZap simplifies the process, making it quick and convenient to shorten and track your links.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 bg-white text-gray-800 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Advanced Analytics</h3>
                        <p className="mt-4 text-gray-600">
                            Get real-time insights into the performance of your links. Track clicks, locations, devices, and more to understand your audience and optimize your content.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-8 bg-white text-gray-800 rounded-lg shadow-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Secure & Reliable</h3>
                        <p className="mt-4 text-gray-600">
                            LinkZap ensures that your shortened URLs are secure, and we prioritize uptime so your links remain active and available whenever you need them.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-semibold text-themeOrange">
                        Why Choose LinkZap?
                    </h3>
                    <p className="mt-4 text-lg text-gray-200">
                        Whether you’re using it for personal projects, marketing campaigns, or business links, LinkZap offers the tools you need to create and track your links with ease. Say goodbye to long URLs and hello to a simplified, trackable experience.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;

import React, { useState } from "react";
import { IoCopy } from "react-icons/io5";


const CopyButton = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy); // Copy text to clipboard
            setCopied(true);

            // Reset "Copied!" state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg ease-in-out duration-200 ${copied ? "focus:ring-2 focus:bg-gradient-to-r focus:from-green-500 focus:to-green-800 " : ""}`}
        >
            <IoCopy />
        </button>
    );
};

export default CopyButton;

import React, { createContext, useState, useContext } from "react";

// Create the context
const UrlContext = createContext();

// Create the provider
export const UrlProvider = ({ children }) => {
    const [urlList, setUrlList] = useState([]);

    // Function to reset the urlList
    const resetUrlList = () => setUrlList([]);

    return (
        <UrlContext.Provider value={{ urlList, setUrlList, resetUrlList }}>
            {children}
        </UrlContext.Provider>
    );
};

// Custom hook for easier use
export const useUrlContext = () => useContext(UrlContext);

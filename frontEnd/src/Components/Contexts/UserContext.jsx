import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Initialize state from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = (userData, expiresIn) => {
        setUser(userData);

        // Save user data to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(userData));

        // Automatically log out the user when needed
        if (expiresIn) {
            setTimeout(() => {
                logoutUser();
            }, expiresIn * 1000); // Convert seconds to milliseconds
        }
    };

    const logoutUser = () => {
        setUser(null);

        // Clear localStorage
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean;
    setIsLoggedIn: (value: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("isLoggedIn") === "true";
    });
    // isLoading is false on client (localStorage read synchronously), true on server for SSR
    const [isLoading] = useState(() => typeof window === "undefined");
    const isInitialMount = useRef(true);

    useEffect(() => {
        // Skip the first render to avoid writing the initial value back to localStorage
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        localStorage.setItem("isLoggedIn", String(isLoggedIn));
    }, [isLoggedIn]);

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

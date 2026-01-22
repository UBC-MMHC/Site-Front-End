"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	isLoading: boolean;
	setIsLoggedIn: (value: boolean) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to safely detect if component has mounted (client-side)
function useHasMounted() {
	return useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const hasMounted = useHasMounted();

	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		if (typeof window === "undefined") return false;
		return localStorage.getItem("isLoggedIn") === "true";
	});

	const isLoading = !hasMounted;

	useEffect(() => {
		if (hasMounted) {
			localStorage.setItem("isLoggedIn", String(isLoggedIn));
		}
	}, [isLoggedIn, hasMounted]);

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

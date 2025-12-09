"use client"
import { useEffect} from "react";
import { API_ROUTES_URL } from "@/app/constants";

export function useCsrfInit() {

    useEffect(() => {
        // console.log("Hook: useEffect running - Initializing CSRF");

        const fetchCsrf = async () => {
            try {
                await fetch(API_ROUTES_URL.csrf_token, {
                    method: "GET",
                    credentials: "include"
                });
                // console.log("CSRF Token initialized");
            } catch (error) {
                // console.error("Failed to initialize CSRF token", error);
            }
        };

        fetchCsrf();
    }, []);
}
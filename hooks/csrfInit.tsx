"use client";
import { useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";

export function useCsrfInit() {
  useEffect(() => {
    const fetchCsrf = async () => {
      try {
        await fetch(API_ROUTES_URL.csrf_token, {
          method: "GET",
          credentials: "include",
        });
      } catch (error) {
        console.error("Failed to initialize CSRF token", error);
      }
    };

    fetchCsrf();
  }, []);
}

import { API_ROUTES_URL } from "@/app/constants";
import { handleApiError } from "@/components/api/apiErrorHandling";

function getCsrfToken() {
    if (typeof document === "undefined") return "";
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? match[2] : "";
}

/**
 * A wrapper for auth POST requests that handles CSRF tokens,
 * headers, credentials, and error handling automatically.
 */
async function authPostRequest(url: string, payload: Record<string, any>) {
    const csrfToken = getCsrfToken();

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(payload),
        credentials: "include",
    });

    if (!res.ok) {
        await handleApiError(res);
    }

    return res.text();
}

export async function login(email: string, password: string) {
    return authPostRequest(API_ROUTES_URL.login_email, { email, password });
}

export async function register(email: string, password: string) {
    return authPostRequest(API_ROUTES_URL.register_email, { email, password });
}

export async function forgot_password(email: string) {
    return authPostRequest(API_ROUTES_URL.forgot_password, { email });
}

export async function reset_password(token: string, newPassword: string) {
    return authPostRequest(API_ROUTES_URL.reset_password, { token, newPassword });
}

export function loginWithGoogle() {
    window.location.href = API_ROUTES_URL.login_google;
}
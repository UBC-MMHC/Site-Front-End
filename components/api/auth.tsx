import { API_ROUTES_URL } from "@/app/constants";
import {handleApiError} from "@/components/api/apiErrorHandling";

export async function loginWithEmail(email: string) {
    const res = await fetch(API_ROUTES_URL.login_email, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) {
        await handleApiError(res);
    }
    return res.text();
}

export function loginWithGoogle() {
    window.location.href = API_ROUTES_URL.login_google;
}

export async function checkToken( email:string, token: string ) {
    const res = await fetch(API_ROUTES_URL.verify, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token }),
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data;
}
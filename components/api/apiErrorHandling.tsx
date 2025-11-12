export interface ApiError extends Error {
    status?: number;
}

export async function handleApiError(res: Response): Promise<never> {
    const { status } = res;

    let text = "";
    try {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await res.json();
            text = data.message || JSON.stringify(data);
        } else {
            text = await res.text();
        }
    } catch {
        text = "Unable to read error response.";
    }

    let message = "An unexpected error occurred.";

    switch (status) {
        case 400:
            message = "Invalid request or bad input.";
            break;
        case 401:
            message = "Unauthorized. Please log in again.";
            break;
        case 403:
            message = "Access denied.";
            break;
        case 404:
            message = "Service unavailable. Try again later.";
            break;
        case 429:
            message = "Too many requests. Please wait a moment and retry.";
            break;
        case 500:
            message = "Server error. Please try again later.";
            break;
        default:
            message = text || message;
    }

    const error = new Error(message) as ApiError;
    error.status = status;
    throw error;
}

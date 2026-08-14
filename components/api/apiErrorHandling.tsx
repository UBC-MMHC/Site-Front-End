export interface ApiError extends Error {
	status?: number;
}

function parseApiErrorBody(data: unknown): string {
	if (data && typeof data === "object") {
		const record = data as Record<string, unknown>;
		if (typeof record.error === "string" && record.error.length > 0) {
			return record.error;
		}
		if (typeof record.message === "string" && record.message.length > 0) {
			return record.message;
		}
	}
	if (typeof data === "string" && data.length > 0) {
		return data;
	}
	try {
		return JSON.stringify(data);
	} catch {
		return "";
	}
}

export async function handleApiError(res: Response): Promise<never> {
	const { status } = res;

	let serverMessage = "";
	try {
		const contentType = res.headers.get("content-type");
		if (contentType && contentType.includes("application/json")) {
			serverMessage = parseApiErrorBody(await res.json());
		} else {
			serverMessage = (await res.text()).trim();
		}
	} catch {
		serverMessage = "";
	}

	let message = "An unexpected error occurred.";

	switch (status) {
		case 400:
			message = serverMessage || "Invalid request or bad input.";
			break;
		case 401:
			message = serverMessage || "Incorrect email or password.";
			break;
		case 403:
			message = serverMessage || "Access denied.";
			break;
		case 404:
			message = serverMessage || "Service unavailable. Try again later.";
			break;
		case 409:
			message = serverMessage || "This action conflicts with existing data.";
			break;
		case 429:
			message = "Too many requests. Please wait a moment and retry.";
			break;
		case 500:
			message = serverMessage || "Server error. Please try again later.";
			break;
		case 503:
			message = serverMessage || "Service temporarily unavailable. Please try again later.";
			break;
		default:
			message = serverMessage || message;
	}

	const error = new Error(message) as ApiError;
	error.status = status;
	throw error;
}

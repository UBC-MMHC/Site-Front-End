import { API_ROUTES_URL } from "@/app/constants";
import { handleApiError } from "@/components/api/apiErrorHandling";

export type MembershipType = "UBC_STUDENT" | "NON_UBC_STUDENT" | "NON_STUDENT";

export interface MembershipRegistrationData {
	fullName: string;
	email: string;
	membershipType: MembershipType;
	studentId?: string;
	instagram?: string;
	instagramGroupchat: boolean;
	newsletterOptIn: boolean;
}

export interface CheckoutSessionResponse {
	sessionId: string;
	sessionUrl: string;
}

export interface MembershipStatus {
	active: boolean;
	membershipType: string;
	startDate: string | null;
	endDate: string | null;
	verifiedAt: string | null;
}

/**
 * Register for membership and get Stripe checkout URL.
 */
export async function registerMembership(
	data: MembershipRegistrationData
): Promise<CheckoutSessionResponse> {
	const res = await fetch(API_ROUTES_URL.membership_register, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		credentials: "include",
	});

	if (!res.ok) {
		await handleApiError(res);
	}

	return res.json();
}

/**
 * Get current user's membership status (requires authentication).
 */
export async function getMembershipStatus(): Promise<MembershipStatus> {
	const res = await fetch(API_ROUTES_URL.membership_status, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		await handleApiError(res);
	}

	return res.json();
}

/**
 * Check if an email has an active membership (public endpoint).
 */
export async function checkMembership(email: string): Promise<{ active: boolean }> {
	const res = await fetch(
		`${API_ROUTES_URL.membership_check}?email=${encodeURIComponent(email)}`,
		{
			method: "GET",
			credentials: "include",
		}
	);

	if (!res.ok) {
		await handleApiError(res);
	}

	return res.json();
}

export interface MyMembershipStatus {
	hasMembership: boolean;
	isPaid: boolean;
	membershipType: string | null;
	paymentStatus: string | null;
}

/**
 * Get current authenticated user's membership status.
 * Used for gating access to dashboard/profile.
 */
export async function getMyMembershipStatus(): Promise<MyMembershipStatus> {
	const res = await fetch(API_ROUTES_URL.membership_my_status, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to get membership status");
	}

	return res.json();
}

/**
 * Create a new Stripe checkout session for an existing unpaid membership.
 * Requires authentication.
 */
export async function retryPayment(): Promise<CheckoutSessionResponse> {
	const res = await fetch(API_ROUTES_URL.membership_retry_payment, {
		method: "POST",
		credentials: "include",
	});

	if (!res.ok) {
		throw new Error("Failed to create payment session");
	}

	return res.json();
}

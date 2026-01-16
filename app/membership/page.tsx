"use client";
import "../globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    registerMembership,
    retryPayment,
    getMyMembershipStatus,
    MembershipType,
    MembershipRegistrationData,
    MyMembershipStatus,
} from "@/components/api/membership";

export default function MembershipPage() {
    const router = useRouter();
    const { isLoggedIn, isLoading: authLoading } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [membershipType, setMembershipType] = useState<MembershipType>("UBC_STUDENT");
    const [existingMembership, setExistingMembership] = useState<MyMembershipStatus | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");

    const isStudentType = membershipType === "UBC_STUDENT" || membershipType === "NON_UBC_STUDENT";

    useEffect(() => {
        const checkExistingMembership = async () => {
            if (authLoading) return;

            if (!isLoggedIn) {
                setIsCheckingStatus(false);
                return;
            }

            try {
                const meRes = await fetch("/api/auth/me", { credentials: "include" });
                if (meRes.ok) {
                    const userData = await meRes.json();
                    setUserEmail(userData.email || "");
                }
            } catch (err) {
                console.log("Could not fetch user email");
            }

            try {
                const status = await getMyMembershipStatus();
                console.log("Membership status received:", status);
                setExistingMembership(status);

                if (status.isPaid) {
                    router.push("/dashboard");
                    return;
                }
            } catch (err) {
                console.error("Membership check error:", err);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkExistingMembership();
    }, [isLoggedIn, authLoading, router]);

    const handleRetryPayment = async () => {
        if (isLoading) return;
        setError(null);
        setIsLoading(true);

        try {
            const response = await retryPayment();
            window.location.href = response.sessionUrl;
        } catch (err: unknown) {
            setIsLoading(false);
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;

        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data: MembershipRegistrationData = {
            fullName: formData.get("fullName") as string,
            email: formData.get("email") as string,
            membershipType: formData.get("membershipType") as MembershipType,
            studentId: isStudentType ? (formData.get("studentId") as string) || undefined : undefined,
            instagram: (formData.get("instagram") as string) || undefined,
            instagramGroupchat: formData.get("instagramGroupchat") === "on",
            newsletterOptIn: formData.get("newsletterOptIn") === "on",
        };

        try {
            const response = await registerMembership(data);
            window.location.href = response.sessionUrl;
        } catch (err: unknown) {
            setIsLoading(false);
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    // Loading state
    if (isCheckingStatus) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-primary-bg">
                <div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>
            </div>
        );
    }

    // Existing unpaid membership - show payment completion
    if (existingMembership?.hasMembership && !existingMembership.isPaid) {
        return (
            <div className="flex min-h-screen flex-col items-center pt-32 pb-12 px-6 bg-primary-bg text-primary-text">
                <div className="w-full max-w-md text-center animate-slide-up">
                    <h1 className="text-4xl font-light tracking-tight mb-3">Complete your payment</h1>
                    <p className="text-grey-text/70 font-light mb-10">
                        You're almost there. Finish setting up your{" "}
                        <span className="text-primary-text">
                            {existingMembership.membershipType?.replace(/_/g, " ").toLowerCase()}
                        </span>{" "}
                        membership.
                    </p>

                    <button
                        onClick={handleRetryPayment}
                        disabled={isLoading}
                        className="w-full py-3.5 bg-accent-2 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isLoading ? "Redirecting..." : "Continue to Payment"}
                    </button>

                    {error && <p className="text-sm mt-4 text-red-400">{error}</p>}

                    <p className="text-sm text-grey-text/50 mt-8">
                        Need help?{" "}
                        <a href="mailto:ubcmmhc@gmail.com" className="text-accent-2 hover:underline">
                            Contact us
                        </a>
                    </p>
                </div>
            </div>
        );
    }

    // Registration form
    return (
        <div className="flex min-h-screen flex-col items-center pt-24 pb-12 px-6 bg-primary-bg text-primary-text">
            <div className="w-full max-w-md animate-slide-up">
                <h1 className="text-4xl font-light tracking-tight text-center mb-2">Become a Member</h1>
                <p className="text-center text-grey-text/70 font-light mb-10">Join UBC Men's Mental Health Club</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm text-grey-text/80 mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            disabled={isLoading}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:outline-none focus:border-accent-2"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm text-grey-text/80 mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            disabled={isLoading}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:outline-none focus:border-accent-2"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Membership Type */}
                    <div>
                        <label htmlFor="membershipType" className="block text-sm text-grey-text/80 mb-2">
                            Membership Type
                        </label>
                        <select
                            id="membershipType"
                            name="membershipType"
                            required
                            disabled={isLoading}
                            value={membershipType}
                            onChange={(e) => setMembershipType(e.target.value as MembershipType)}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-grey-text/30 text-primary-text focus:outline-none focus:border-accent-2 cursor-pointer"
                        >
                            <option value="UBC_STUDENT" className="bg-primary-bg">
                                UBC Student
                            </option>
                            <option value="NON_UBC_STUDENT" className="bg-primary-bg">
                                Non-UBC Student
                            </option>
                            <option value="NON_STUDENT" className="bg-primary-bg">
                                Non-Student
                            </option>
                        </select>
                    </div>

                    {/* Student ID */}
                    {isStudentType && (
                        <div className="animate-slide-up">
                            <label htmlFor="studentId" className="block text-sm text-grey-text/80 mb-2">
                                Student ID <span className="text-grey-text/50">(optional)</span>
                            </label>
                            <input
                                id="studentId"
                                name="studentId"
                                type="text"
                                disabled={isLoading}
                                className="w-full px-0 py-3 bg-transparent border-0 border-b border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:outline-none focus:border-accent-2"
                                placeholder="12345678"
                            />
                        </div>
                    )}

                    {/* Instagram */}
                    <div>
                        <label htmlFor="instagram" className="block text-sm text-grey-text/80 mb-2">
                            Instagram <span className="text-grey-text/50">(optional)</span>
                        </label>
                        <input
                            id="instagram"
                            name="instagram"
                            type="text"
                            disabled={isLoading}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:outline-none focus:border-accent-2"
                            placeholder="@yourhandle"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 pt-4">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="instagramGroupchat"
                                disabled={isLoading}
                                className="w-5 h-5 rounded border-grey-text/30 accent-accent-2"
                            />
                            <span className="text-sm text-grey-text/80 group-hover:text-grey-text transition">
                                Add me to the Instagram group chat
                            </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="newsletterOptIn"
                                disabled={isLoading}
                                className="w-5 h-5 rounded border-grey-text/30 accent-accent-2"
                            />
                            <span className="text-sm text-grey-text/80 group-hover:text-grey-text transition">
                                Subscribe to our newsletter
                            </span>
                        </label>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 mt-6 bg-accent-2 text-white font-medium rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                        {isLoading ? "Processing..." : "Continue to Payment"}
                    </button>

                    {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                </form>
            </div>
        </div>
    );
}

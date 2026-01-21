"use client";
import { API_ROUTES_URL } from "@/app/constants";
import React, { useState } from "react";

const NewsletterSignup = () => {
    const [emailInput, setEmailInput] = useState<string>("");
    const [didSignup, setDidSignup] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isWaiting, setIsWaiting] = useState<boolean>(false);

    const handleOnSignup = async () => {
        if (didSignup) {
            return;
        }

        setErrorMessage("");
        setSuccessMessage("");
        setIsWaiting(true);

        try {
            const res = await fetch(API_ROUTES_URL.subscribe_email_to_newsletter, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailInput }),
                credentials: "include",
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Newsletter signup error:", errorText);
                setErrorMessage("Error subscribing to newsletter. Please try again later.");
                return;
            }

            setSuccessMessage("Successfully subscribed to the newsletter!");
            setDidSignup(true);
        } catch (err) {
            console.error("Newsletter signup failed:", err);
            setErrorMessage("Network error. Please try again later.");
        } finally {
            setIsWaiting(false);
        }
    };

    return (
        <div className="flex w-full max-w-[500px] flex-col overflow-hidden">
            <div className="flex w-full max-w-lg flex-col items-stretch sm:flex-row">
                <input
                    className="bg-primary-bg-dark text-grey-text w-full grow rounded-md border-2 px-4 py-3 focus:outline-none"
                    type="text"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                />

                <button
                    onClick={handleOnSignup}
                    disabled={isWaiting || didSignup}
                    className="bg-primary-bg-dark text-secondary hover:bg-accent-1 mt-2 flex w-full min-w-[100px] items-center justify-center rounded-md border-2 px-6 py-3 font-semibold whitespace-nowrap shadow-md transition duration-300 hover:cursor-pointer sm:mt-0 sm:ml-2 sm:w-auto"
                >
                    Subscribe
                </button>
            </div>

            {successMessage && <p className="text-primary-text mt-2">{successMessage}</p>}
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </div>
    );
};

export default NewsletterSignup;

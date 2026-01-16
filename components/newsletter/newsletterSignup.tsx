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
    <div className="flex flex-col w-full max-w-[500px] overflow-hidden">
      <div className="flex flex-col sm:flex-row items-stretch w-full max-w-lg">
        <input
          className="bg-primary-bg-dark text-grey-text grow px-4 py-3 border-2 rounded-md 
                 focus:outline-none w-full"
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter your email"
        />

        <button
          onClick={handleOnSignup}
          disabled={isWaiting || didSignup}
          className="flex mt-2 sm:mt-0 sm:ml-2 px-6 py-3 bg-primary-bg-dark border-2 
                 text-secondary font-semibold rounded-md shadow-md 
                 hover:bg-accent-1 transition duration-300 
                 w-full sm:w-auto min-w-[100px] whitespace-nowrap justify-center
                 items-center hover:cursor-pointer">
          Subscribe
        </button>
      </div>

      {successMessage && <p className="text-primary-text mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </div>
  );
};

export default NewsletterSignup;

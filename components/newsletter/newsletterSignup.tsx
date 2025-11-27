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

    setIsWaiting(true);
    const res = await fetch(API_ROUTES_URL.subscribe_email_to_newsletter, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput }),
    });
    setIsWaiting(false);

    if (!res.ok) {
      console.error(res.text);
      setErrorMessage("Error subscribing email to newsletter, please try again later.");
    }

    setSuccessMessage("Successfully subscribed to the newsletter.");
    setDidSignup(true);
  };

  return (
    <div className="flex flex-col w-full max-w-[500px] overflow-hidden">
      <div className="flex flex-col sm:flex-row items-stretch w-full max-w-lg">
        <input
          className="bg-secondary-bg text-grey-text grow px-4 py-3 border-2 rounded-md 
                 focus:outline-none w-full"
          type="text"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter your email"
        />

        <button
          onClick={handleOnSignup}
          disabled={isWaiting || didSignup}
          className="flex mt-2 sm:mt-0 sm:ml-2 px-6 py-3 bg-secondary-bg border-2 
                 text-secondary font-semibold rounded-md shadow-md 
                 hover:bg-accent-1 transition duration-300 
                 w-full sm:w-auto min-w-[100px] whitespace-nowrap justify-center
                 items-center">
          Subscribe
        </button>
      </div>

      {successMessage && <p className="text-primary-text mt-2">{successMessage}</p>}
      {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
    </div>
  );
};

export default NewsletterSignup;

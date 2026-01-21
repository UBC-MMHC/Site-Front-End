"use client";

import React, { useState, useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";
import MembershipGate from "@/components/MembershipGate";

export default function DashboardPage(): React.ReactElement {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "already_subscribed">("idle");

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const userData = await res.json();
          if (userData.newsletterSubscription) {
            setStatus("already_subscribed");
          }
        }
      } catch (err) {
        console.log("Could not check subscription status");
      }
    };
    checkSubscription();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubscribing) return;

    setIsSubscribing(true);
    try {
      const res = await fetch(API_ROUTES_URL.subscribe_email_to_newsletter, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <MembershipGate>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-primary-bg text-primary-text">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-primary-text">
            Something new
            <br />
            is coming.
          </h1>

          <p className="text-xl text-grey-text/80 font-light max-w-md mx-auto leading-relaxed">
            We&apos;re crafting an experience worth waiting for.
          </p>

          <div className="mt-12">
            {status === "success" || status === "already_subscribed" ? (
              <p className="text-grey-text font-light">
                {status === "already_subscribed"
                  ? "You're already subscribed to our newsletter."
                  : "Thank you. We'll be in touch."}
              </p>
            ) : (
              <>
                <p className="text-grey-text/60 text-sm mb-4">Get notified when we launch.</p>
                <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    disabled={isSubscribing}
                    className="flex-1 px-0 py-2 bg-transparent border-b border-grey-text/30 text-primary-text placeholder:text-grey-text/40 focus:outline-none focus:border-accent-2 transition-colors text-center"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing || !email}
                    className="p-2 text-grey-text hover:text-accent-2 transition-colors disabled:opacity-30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
                {status === "error" && <p className="text-grey-text/60 text-xs mt-3">Please try again.</p>}
              </>
            )}
          </div>
        </div>
      </div>
    </MembershipGate>
  );
}
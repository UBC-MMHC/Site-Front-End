"use client";
import "../../globals.css";
import Link from "next/link";

export default function MembershipCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-bg text-primary-text px-6">
      <div className="w-full max-w-sm text-center animate-slide-up">
        <div className="w-14 h-14 mx-auto mb-8 rounded-full bg-grey-text/20 flex items-center justify-center">
          <svg className="w-7 h-7 text-grey-text/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-light tracking-tight mb-3">Payment cancelled</h1>
        <p className="text-grey-text/70 font-light mb-10">
          No charges were made.
          <br />
          You can try again whenever you're ready.
        </p>

        <div className="space-y-3">
          <Link
            href="/membership"
            className="inline-block w-full py-3.5 bg-accent-2 text-white font-medium rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="inline-block w-full py-3.5 text-grey-text/70 font-medium hover:text-grey-text transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

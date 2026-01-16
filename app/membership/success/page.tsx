"use client";
import "../../globals.css";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isVerifying) {
    return <div className="text-grey-text/60 animate-subtle-pulse">Confirming payment...</div>;
  }

  return (
    <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
      <div className="w-14 h-14 mx-auto mb-8 rounded-full bg-accent-2 flex items-center justify-center">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-light tracking-tight mb-3">Welcome to the Club</h1>
      <p className="text-grey-text/70 font-light mb-10">
        Your membership is now active.
        <br />
        Thank you for joining us.
      </p>

      <Link
        href="/dashboard"
        className="inline-block w-full py-3.5 bg-primary-text text-primary-bg font-medium rounded-lg hover:opacity-90 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

function LoadingFallback() {
  return <div className="text-grey-text/60 animate-subtle-pulse">Loading...</div>;
}

export default function MembershipSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-bg text-primary-text px-6">
      <div className="w-full max-w-sm text-center">
        <Suspense fallback={<LoadingFallback />}>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}

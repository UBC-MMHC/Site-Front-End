"use client";

import React from "react";
import MembershipGate from "@/components/MembershipGate";

export default function ProfilePage(): React.ReactElement {
  return (
    <MembershipGate>
      <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-primary-bg text-primary-text">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 text-primary-text">
            Your profile.
            <br />
            Updated.
          </h1>

          <p className="text-xl text-grey-text/80 font-light max-w-md mx-auto leading-relaxed">
            An updated experience is on the way.
          </p>
        </div>
      </div>
    </MembershipGate>
  );
}

"use client";

import React from "react";
import MembershipGate from "@/components/MembershipGate";

export default function ProfilePage(): React.ReactElement {
	return (
		<MembershipGate>
			<div className="bg-primary-bg text-primary-text flex min-h-screen flex-col items-center justify-center px-6">
				<div className="w-full max-w-xl text-center">
					<h1 className="text-primary-text mb-6 text-5xl font-semibold tracking-tight md:text-6xl">
						Your profile.
						<br />
						Updated.
					</h1>

					<p className="text-grey-text/80 mx-auto max-w-md text-xl leading-relaxed font-light">
						An updated experience is on the way.
					</p>
				</div>
			</div>
		</MembershipGate>
	);
}

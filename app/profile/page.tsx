"use client";

import React from "react";
import MembershipGate from "@/components/MembershipGate";
import DarkPageShell from "@/components/layout/DarkPageShell";
import { centerPage, contentColumn, copyColumn, textHeading, textMuted } from "@/lib/theme";

export default function ProfilePage(): React.ReactElement {
	return (
		<MembershipGate>
			<DarkPageShell className={centerPage}>
				<div className={contentColumn}>
					<h1 className={`mb-6 text-5xl font-semibold tracking-tight md:text-6xl ${textHeading}`}>
						Your profile.
						<br />
						Updated.
					</h1>

					<p className={`text-xl leading-relaxed font-light ${textMuted} ${copyColumn}`}>
						An updated experience is on the way.
					</p>
				</div>
			</DarkPageShell>
		</MembershipGate>
	);
}

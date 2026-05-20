"use client";

import React, { useState, useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";
import DarkPageShell from "@/components/layout/DarkPageShell";
import { AuthLoading } from "@/components/layout/AuthLoading";
import {
	formInputClass,
	formLabelClass,
	FormButton,
	FormSelect,
} from "@/components/ui/form";
import {
	pageShell,
	pillOutline,
	pillPrimary,
	surfaceCard,
	textHeading,
	textMuted,
} from "@/lib/theme";

interface PendingMembership {
	email: string;
	fullName: string;
	membershipType: string;
	studentId: string;
	instagram: string;
	paymentStatus: string;
}

type PaymentMethod = "CASH" | "ETRANSFER" | "OTHER";
type RoleType = "ROLE_USER" | "ROLE_ADMIN" | "ROLE_SUPERADMIN";

export default function AdminPage(): React.ReactElement {
	const [pendingMemberships, setPendingMemberships] = useState<PendingMembership[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [actionStatus, setActionStatus] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);

	const [roleEmail, setRoleEmail] = useState("");
	const [selectedRole, setSelectedRole] = useState<RoleType>("ROLE_ADMIN");
	const [roleLoading, setRoleLoading] = useState(false);

	const fetchPendingMemberships = async () => {
		try {
			setLoading(true);
			const res = await fetch(API_ROUTES_URL.admin_pending_memberships, {
				credentials: "include",
			});
			if (!res.ok) {
				if (res.status === 401 || res.status === 403) {
					throw new Error("You don't have permission to access this page");
				}
				throw new Error("Failed to fetch pending memberships");
			}
			const data = await res.json();
			setPendingMemberships(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPendingMemberships();
	}, []);

	const approveMembership = async (email: string, paymentMethod: PaymentMethod) => {
		try {
			const res = await fetch(
				`${API_ROUTES_URL.admin_approve_membership}/${encodeURIComponent(email)}/approve`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ paymentMethod }),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to approve membership");
			}
			setActionStatus({ type: "success", message: `Approved ${email} via ${paymentMethod}` });
			fetchPendingMemberships();
		} catch (err) {
			setActionStatus({
				type: "error",
				message: err instanceof Error ? err.message : "Failed to approve",
			});
		}
	};

	const assignRole = async () => {
		if (!roleEmail) return;
		setRoleLoading(true);
		try {
			const res = await fetch(
				`${API_ROUTES_URL.admin_assign_role}/${encodeURIComponent(roleEmail)}/role`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ role: selectedRole }),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to assign role");
			}
			setActionStatus({ type: "success", message: data.message });
			setRoleEmail("");
		} catch (err) {
			setActionStatus({
				type: "error",
				message: err instanceof Error ? err.message : "Failed to assign role",
			});
		} finally {
			setRoleLoading(false);
		}
	};

	const removeRole = async () => {
		if (!roleEmail) return;
		setRoleLoading(true);
		try {
			const res = await fetch(
				`${API_ROUTES_URL.admin_assign_role}/${encodeURIComponent(roleEmail)}/role`,
				{
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ role: selectedRole }),
				}
			);
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Failed to remove role");
			}
			setActionStatus({ type: "success", message: data.message });
			setRoleEmail("");
		} catch (err) {
			setActionStatus({
				type: "error",
				message: err instanceof Error ? err.message : "Failed to remove role",
			});
		} finally {
			setRoleLoading(false);
		}
	};

	if (loading) {
		return <AuthLoading />;
	}

	if (error) {
		return (
			<DarkPageShell className="flex min-h-screen flex-col items-center justify-center px-6">
				<div className="text-center">
					<p className="mb-4 text-xl text-red-600 dark:text-red-400">{error}</p>
					<button type="button" onClick={fetchPendingMemberships} className={pillPrimary}>
						Retry
					</button>
				</div>
			</DarkPageShell>
		);
	}

	return (
		<div className={`${pageShell} px-6 py-12 pt-28`}>
			<div className="mx-auto w-full max-w-hero">
				<h1 className={`mb-8 text-4xl font-semibold ${textHeading}`}>Admin Panel</h1>

				{actionStatus && (
					<div
						className={`mb-6 rounded-lg p-4 ${
							actionStatus.type === "success"
								? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
								: "bg-red-500/10 text-red-700 dark:text-red-400"
						}`}
					>
						{actionStatus.message}
						<button
							type="button"
							onClick={() => setActionStatus(null)}
							className="ml-4 text-sm opacity-70 hover:opacity-100"
						>
							Dismiss
						</button>
					</div>
				)}

				<section className="mb-12">
					<h2 className={`mb-4 text-2xl font-medium ${textHeading}`}>Pending Memberships</h2>
					{pendingMemberships.length === 0 ? (
						<p className={textMuted}>No pending memberships</p>
					) : (
						<div className={`overflow-x-auto ${surfaceCard}`}>
							<table className="w-full border-collapse">
								<thead>
									<tr className="border-b border-border">
										<th className={`px-4 py-3 text-left text-sm font-medium ${textMuted}`}>
											Name
										</th>
										<th className={`px-4 py-3 text-left text-sm font-medium ${textMuted}`}>
											Email
										</th>
										<th className={`px-4 py-3 text-left text-sm font-medium ${textMuted}`}>
											Type
										</th>
										<th className={`px-4 py-3 text-left text-sm font-medium ${textMuted}`}>
											Student ID
										</th>
										<th className={`px-4 py-3 text-left text-sm font-medium ${textMuted}`}>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{pendingMemberships.map((m) => (
										<tr
											key={m.email}
											className="border-b border-border/50 hover:bg-surface-elevated/50"
										>
											<td className="px-4 py-3">{m.fullName}</td>
											<td className="px-4 py-3 text-sm">{m.email}</td>
											<td className="px-4 py-3 text-sm">{m.membershipType}</td>
											<td className="px-4 py-3 text-sm">{m.studentId || "—"}</td>
											<td className="px-4 py-3">
												<div className="flex flex-wrap gap-2">
													<button
														type="button"
														onClick={() => approveMembership(m.email, "CASH")}
														className={pillPrimary}
													>
														Cash
													</button>
													<button
														type="button"
														onClick={() => approveMembership(m.email, "ETRANSFER")}
														className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-blue-500"
													>
														E-Transfer
													</button>
													<button
														type="button"
														onClick={() => approveMembership(m.email, "OTHER")}
														className={pillOutline}
													>
														Other
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>

				<section>
					<h2 className={`mb-4 text-2xl font-medium ${textHeading}`}>Role Management</h2>
					<div className={`max-w-form p-6 ${surfaceCard}`}>
						<div className="mb-4" data-form-ui>
							<label className={formLabelClass}>User Email</label>
							<input
								type="email"
								value={roleEmail}
								onChange={(e) => setRoleEmail(e.target.value)}
								placeholder="user@example.com"
								className={formInputClass}
							/>
						</div>
						<div className="mb-4" data-form-ui>
							<label className={formLabelClass}>Role</label>
							<FormSelect
								value={selectedRole}
								onChange={(e) => setSelectedRole(e.target.value as RoleType)}
							>
								<option value="ROLE_USER">ROLE_USER</option>
								<option value="ROLE_ADMIN">ROLE_ADMIN</option>
								<option value="ROLE_SUPERADMIN">ROLE_SUPERADMIN</option>
							</FormSelect>
						</div>
						<div className="flex gap-3">
							<FormButton
								variant="primary"
								className="flex-1 !w-auto"
								disabled={!roleEmail || roleLoading}
								onClick={assignRole}
							>
								{roleLoading ? "…" : "Assign Role"}
							</FormButton>
							<button
								type="button"
								onClick={removeRole}
								disabled={!roleEmail || roleLoading}
								className="flex-1 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{roleLoading ? "…" : "Remove Role"}
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

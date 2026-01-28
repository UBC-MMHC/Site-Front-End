"use client";

import React, { useState, useEffect } from "react";
import { API_ROUTES_URL } from "@/app/constants";

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
			fetchPendingMemberships(); // Refresh list
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
		return (
			<div className="bg-primary-bg text-primary-text flex min-h-screen items-center justify-center">
				<div className="animate-subtle-pulse text-xl">Loading...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-primary-bg text-primary-text flex min-h-screen items-center justify-center">
				<div className="text-center">
					<p className="text-danger mb-4 text-xl">{error}</p>
					<button
						onClick={fetchPendingMemberships}
						className="bg-accent-2 hover:bg-accent-2/80 rounded px-4 py-2 text-white transition-colors"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-primary-bg text-primary-text min-h-screen px-6 py-12">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-8 text-4xl font-semibold">Admin Panel</h1>

				{/* Status message */}
				{actionStatus && (
					<div
						className={`mb-6 rounded-lg p-4 ${
							actionStatus.type === "success"
								? "bg-accent-2/20 text-accent-2"
								: "bg-danger/20 text-danger"
						}`}
					>
						{actionStatus.message}
						<button
							onClick={() => setActionStatus(null)}
							className="ml-4 text-sm opacity-70 hover:opacity-100"
						>
							Dismiss
						</button>
					</div>
				)}

				{/* Pending Memberships Section */}
				<section className="mb-12">
					<h2 className="text-grey-text mb-4 text-2xl font-medium">Pending Memberships</h2>
					{pendingMemberships.length === 0 ? (
						<p className="text-grey-text/60">No pending memberships</p>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full border-collapse">
								<thead>
									<tr className="border-grey-text/20 border-b">
										<th className="text-grey-text px-4 py-3 text-left text-sm font-medium">Name</th>
										<th className="text-grey-text px-4 py-3 text-left text-sm font-medium">
											Email
										</th>
										<th className="text-grey-text px-4 py-3 text-left text-sm font-medium">Type</th>
										<th className="text-grey-text px-4 py-3 text-left text-sm font-medium">
											Student ID
										</th>
										<th className="text-grey-text px-4 py-3 text-left text-sm font-medium">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{pendingMemberships.map((m) => (
										<tr key={m.email} className="border-grey-text/10 border-b hover:bg-white/5">
											<td className="px-4 py-3">{m.fullName}</td>
											<td className="px-4 py-3 text-sm">{m.email}</td>
											<td className="px-4 py-3 text-sm">{m.membershipType}</td>
											<td className="px-4 py-3 text-sm">{m.studentId || "-"}</td>
											<td className="px-4 py-3">
												<div className="flex gap-2">
													<button
														onClick={() => approveMembership(m.email, "CASH")}
														className="bg-accent-2 hover:bg-accent-2/80 rounded px-3 py-1 text-sm text-white transition-colors"
													>
														Cash
													</button>
													<button
														onClick={() => approveMembership(m.email, "ETRANSFER")}
														className="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-400"
													>
														E-Transfer
													</button>
													<button
														onClick={() => approveMembership(m.email, "OTHER")}
														className="text-grey-text hover:text-primary-text rounded border border-current px-3 py-1 text-sm transition-colors"
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

				{/* Role Management Section */}
				<section>
					<h2 className="text-grey-text mb-4 text-2xl font-medium">Role Management</h2>
					<div className="bg-accent-1/30 max-w-md rounded-lg p-6">
						<div className="mb-4">
							<label className="text-grey-text mb-2 block text-sm">User Email</label>
							<input
								type="email"
								value={roleEmail}
								onChange={(e) => setRoleEmail(e.target.value)}
								placeholder="user@example.com"
								className="border-grey-text/30 focus:border-accent-2 bg-primary-bg w-full rounded border px-4 py-2 text-white transition-colors outline-none"
							/>
						</div>
						<div className="mb-4">
							<label className="text-grey-text mb-2 block text-sm">Role</label>
							<select
								value={selectedRole}
								onChange={(e) => setSelectedRole(e.target.value as RoleType)}
								className="border-grey-text/30 focus:border-accent-2 bg-primary-bg w-full rounded border px-4 py-2 text-white transition-colors outline-none"
							>
								<option value="ROLE_USER">ROLE_USER</option>
								<option value="ROLE_ADMIN">ROLE_ADMIN</option>
								<option value="ROLE_SUPERADMIN">ROLE_SUPERADMIN</option>
							</select>
						</div>
						<div className="flex gap-3">
							<button
								onClick={assignRole}
								disabled={!roleEmail || roleLoading}
								className="bg-accent-2 hover:bg-accent-2/80 flex-1 rounded px-4 py-2 text-white transition-colors disabled:opacity-50"
							>
								{roleLoading ? "..." : "Assign Role"}
							</button>
							<button
								onClick={removeRole}
								disabled={!roleEmail || roleLoading}
								className="bg-danger hover:bg-danger/80 flex-1 rounded px-4 py-2 text-white transition-colors disabled:opacity-50"
							>
								{roleLoading ? "..." : "Remove Role"}
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

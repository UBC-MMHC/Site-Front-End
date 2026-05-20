import Image from "next/image";
import {
	DISCORD_URL,
	EMAIL,
	EXEC_SIGNUP_URL,
	GOOGLE_CALENDAR_URL,
	INSTAGRAM_URL,
	LINK_TREE as LINK_TREE_URL,
	MEMBERSHIP_SIGNUP_URL,
} from "@/app/constants";
import NewsletterSignup from "./newsletter/newsletterSignup";

const Footer = () => {
	const linkClasses = "text-muted-soft text-sm transition-colors hover:text-on-dark hover:underline";

	return (
		<footer className="bg-canvas-dark text-body-on-dark w-full py-16 px-8 text-sm">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
				{/* Logo column */}
				<div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-left sm:col-span-2 md:col-span-1">
					<Image
						src="/MMHC_Circle_Logo.jpg"
						alt="UBC MMHC logo"
						width={80}
						height={80}
						className="rounded-full"
					/>
					<p className="text-body-on-dark text-[15px] font-medium opacity-90">Community. Grit. Growth.</p>
				</div>

				{/* Connect column */}
				<div>
					<h3 className="mb-4 text-base font-semibold font-heading text-on-dark">Connect</h3>
					<ul className="space-y-3">
						<li>
							<a href={MEMBERSHIP_SIGNUP_URL} className={linkClasses}>
								Become a Member
							</a>
						</li>
						<li>
							<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
								Instagram
							</a>
						</li>
						<li>
							<a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
								Join our Discord
							</a>
						</li>
						<li>
							<a href={`mailto:${EMAIL}`} className={linkClasses}>
								Email Us
							</a>
						</li>
						<li>
							<a href={EXEC_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
								Join Our Executive Team
							</a>
						</li>
					</ul>
				</div>

				{/* See More column */}
				<div>
					<h3 className="mb-4 text-base font-semibold font-heading text-on-dark">See More</h3>
					<ul className="space-y-3">
						<li>
							<a href={GOOGLE_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
								Events Calendar
							</a>
						</li>
						<li>
							<a href={LINK_TREE_URL} target="_blank" rel="noopener noreferrer" className={linkClasses}>
								Link Tree
							</a>
						</li>
					</ul>
				</div>

				{/* Newsletter column */}
				<div>
					<h3 className="mb-4 text-base font-semibold font-heading text-on-dark">Newsletter</h3>
					<p className="text-muted-soft text-sm mb-4 leading-relaxed">Subscribe to our weekly newsletter</p>
					<NewsletterSignup layout="stacked" />
				</div>
			</div>

			{/* Bottom bar */}
			<div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-hairline-on-dark text-center sm:text-left">
				<p className="text-muted-soft text-xs">
					&copy; {new Date().getFullYear()} UBC Men&apos;s Mental Health Club. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;

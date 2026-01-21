import Image from "next/image";
import {
	EMAIL,
	EXEC_SIGNUP_URL,
	INSTAGRAM_URL,
	LINK_TREE as LINK_TREE_URL,
	MEMBERSHIP_SIGNUP_URL,
} from "@/app/constants";
import NewsletterSignup from "./newsletter/newsletterSignup";

const Footer = () => {
	return (
		<footer className="bg-primary-bg-dark w-full pt-8 text-white">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pt-4 md:grid-cols-3">
				{/* Left column */}
				<div className="flex flex-col items-center gap-2 p-8 text-center">
					<Image
						src="/MMHC_Circle_Logo.jpg"
						alt="UBC MMHC logo"
						width={120}
						height={120}
						className="rounded-full"
					/>
					<p className="text-m text-primary-text">Community. Grit. Growth. </p>
				</div>

				{/* Middle column */}
				<div>
					<h3 className="mb-2 text-lg font-semibold">Connect</h3>
					<ul className="space-y-2 text-sm">
						<li>
							<a
								href={MEMBERSHIP_SIGNUP_URL}
								target="_blank"
								className="text-grey-text transition-colors hover:text-white"
							>
								Become a Member
							</a>
						</li>
						<li>
							<a
								href={INSTAGRAM_URL}
								target="_blank"
								className="text-grey-text transition-colors hover:text-white"
							>
								Instagram
							</a>
						</li>
						<li>
							<a
								href={`mailto:${EMAIL}`}
								target="_blank"
								className="text-grey-text transition-colors hover:text-white"
							>
								Email Us
							</a>
						</li>
						<li>
							<a
								href={EXEC_SIGNUP_URL}
								target="_blank"
								className="text-grey-text transition-colors hover:text-white"
							>
								Join Our Executive Team
							</a>
						</li>
						<li>
							<a
								href={LINK_TREE_URL}
								target="_blank"
								className="text-grey-text transition-colors hover:text-white"
							>
								Link Tree
							</a>
						</li>
					</ul>
				</div>

				{/* Right column */}
				<div>
					<h3 className="mb-2 text-lg font-semibold">Newsletter</h3>
					<p className="text-md text-primary-text pb-2">
						Subscribe to our weekly newsletter
					</p>
					<NewsletterSignup />
				</div>
			</div>

			{/* Bottom bar */}
			<div className="p-3 pt-0 text-center">
				<p className="text-primary-text text-xs">
					&copy; {new Date().getFullYear()} UBC Men&apos;s Mental Health Club. All rights
					reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;

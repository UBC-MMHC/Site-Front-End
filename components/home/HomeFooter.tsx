import Image from "next/image";
import Link from "next/link";
import {
	DISCORD_URL,
	EMAIL,
	EXEC_SIGNUP_URL,
	GOOGLE_CALENDAR_URL,
	INSTAGRAM_URL,
	LINK_TREE as LINK_TREE_URL,
	MEMBERSHIP_SIGNUP_URL,
} from "@/app/constants";
import NewsletterSignup from "@/components/newsletter/newsletterSignup";

const linkClass =
	"inline-block text-sm text-zinc-400 transition-colors duration-300 hover:text-white";

export default function HomeFooter() {
	return (
		<footer className="relative z-10 overflow-hidden border-t border-zinc-900 bg-zinc-950 pb-12 pt-32">
			<div className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 select-none text-center">
				<span className="whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter text-zinc-900/40">
					MMHC
				</span>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<div className="mb-24 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					<div className="lg:col-span-2">
						<div className="mb-4 flex items-center gap-3">
							<Image
								src="/MMHC_cropped_logo.png"
								alt="UBC MMHC"
								width={32}
								height={32}
								className="rounded-full"
							/>
							<span className="text-2xl font-semibold tracking-tighter text-white">UBC MMHC</span>
						</div>
						<p className="mb-8 max-w-sm text-sm leading-relaxed text-zinc-400">
							Subscribe to our weekly newsletter for events, updates, and news from the club.
						</p>
						<NewsletterSignup layout="pill" />
					</div>

					<div>
						<h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white">
							Pillars
						</h4>
						<ul className="space-y-4 text-sm">
							<li>
								<a href="#pillars" className={linkClass}>
									Community
								</a>
							</li>
							<li>
								<a href="#pillars" className={linkClass}>
									Grit
								</a>
							</li>
							<li>
								<a href="#pillars" className={linkClass}>
									Growth
								</a>
							</li>
							<li>
								<Link href="/about" className={linkClass}>
									About Us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-white">
							Connect
						</h4>
						<ul className="space-y-4 text-sm">
							<li>
								<Link href={MEMBERSHIP_SIGNUP_URL} className={linkClass}>
									Become a Member
								</Link>
							</li>
							<li>
								<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
									Instagram
								</a>
							</li>
							<li>
								<a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
									Discord
								</a>
							</li>
							<li>
								<a href={`mailto:${EMAIL}`} className={linkClass}>
									Email Us
								</a>
							</li>
							<li>
								<a href={GOOGLE_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
									Events Calendar
								</a>
							</li>
							<li>
								<a href={LINK_TREE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
									Link Tree
								</a>
							</li>
							<li>
								<a href={EXEC_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
									Join Executive Team
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800/50 pt-8 md:flex-row">
					<p className="text-xs font-medium text-zinc-600">
						&copy; {new Date().getFullYear()} UBC Men&apos;s Mental Health Club. Community. Grit. Growth.
					</p>
					<div className="flex gap-6 text-xs font-medium text-zinc-600">
						<Link href="/about" className="transition-colors hover:text-zinc-300">
							About
						</Link>
						<Link href="/events" className="transition-colors hover:text-zinc-300">
							Events
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

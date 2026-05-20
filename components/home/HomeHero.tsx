import Image from "next/image";
import Link from "next/link";
import { MEMBERSHIP_SIGNUP_URL } from "@/app/constants";

const HERO_IMAGE = "/hero/DiscussionHero.JPG";

export default function HomeHero() {
	return (
		<section className="relative flex h-screen min-h-[640px] items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0 bg-hero-base">
				<Image
					src={HERO_IMAGE}
					alt=""
					fill
					priority
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-hero-base/80 via-hero-base/70 to-page" />
			</div>

			<div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
				<h1 className="text-4xl font-semibold uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
					UBC Men&apos;s Mental Health Club
				</h1>

				<p className="mt-6 text-base font-medium uppercase tracking-[0.25em] text-zinc-300 md:text-lg">
					Community
					<span className="mx-3 text-zinc-500" aria-hidden>
						·
					</span>
					Grit
					<span className="mx-3 text-zinc-500" aria-hidden>
						·
					</span>
					Growth
				</p>

				<div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link
						href={MEMBERSHIP_SIGNUP_URL}
						className="w-full rounded-full bg-zinc-50 px-8 py-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 sm:w-auto"
					>
						Become a member
					</Link>
					<Link
						href="#vision"
						className="w-full rounded-full border border-zinc-700/50 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
					>
						Our mission
					</Link>
				</div>
			</div>
		</section>
	);
}

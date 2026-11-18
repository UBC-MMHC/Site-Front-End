import Image from "next/image";
import Link from "next/link";
import { MEMBERSHIP_SIGNUP_URL } from "@/app/constants";
import { ArrowRight } from "lucide-react";

export default function MembershipCta() {
	return (
		<section id="join" className="px-6 py-32">
			<div className="bg-hero-base relative mx-auto flex h-[60vh] min-h-[420px] max-w-7xl items-center justify-center overflow-hidden rounded-3xl md:h-[80vh] md:min-h-[480px]">
				<div className="absolute inset-0 flex items-center justify-center">
					<Image
						src="/hero/HikingGroup.png"
						alt=""
						width={1920}
						height={1080}
						className="h-full w-auto max-w-none"
						sizes="(max-width: 1280px) 100vw, 1280px"
						aria-hidden
					/>
				</div>
				<div className="bg-hero-base/40 absolute inset-0" />
				<div className="from-hero-base/55 via-hero-base/50 to-hero-base/55 absolute inset-0 bg-gradient-to-b" />
				<div
					className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,rgba(11,21,41,0.72),rgba(11,21,41,0.2)_100%)]"
					aria-hidden
				/>

				<div className="relative z-20 mx-auto max-w-3xl px-6 text-center">
					<h2 className="mb-6 text-4xl font-semibold tracking-tighter text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.65),0_0_32px_rgba(0,0,0,0.35)] md:text-6xl">
						Become a member of our <span className="font-light text-white italic">community</span>.
					</h2>
					<p className="mb-10 text-base leading-relaxed font-medium text-zinc-50 [text-shadow:0_1px_6px_rgba(0,0,0,0.7),0_0_20px_rgba(0,0,0,0.35)] md:text-lg">
						Step into a brotherhood of men committed to open conversation, peer support, and
						self-improvement. Membership is open to all UBC students.
					</p>
					<Link
						href={MEMBERSHIP_SIGNUP_URL}
						className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors [text-shadow:0_1px_6px_rgba(0,0,0,0.7)] hover:text-zinc-200"
					>
						<span>Become a member</span>
						<ArrowRight className="h-4 w-4" aria-hidden />
					</Link>
				</div>
			</div>
		</section>
	);
}

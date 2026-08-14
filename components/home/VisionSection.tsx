import Image from "next/image";
import { accentLine, textHeading, textMuted } from "@/lib/theme";

export default function VisionSection() {
	return (
		<section id="vision" className="px-6 py-32 md:py-48">
			<div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-32">
				<div className="order-2 lg:order-1">
					<div className="mb-8 flex items-center gap-3">
						<div className={`h-px w-8 ${accentLine}`} />
						<span className={`text-xs font-medium uppercase tracking-widest ${textMuted}`}>
							Who we are
						</span>
					</div>

					<h2 className={`text-3xl font-semibold leading-tight tracking-tight md:text-5xl ${textHeading}`}>
						A community built for <br />
						men&apos;s mental health.
					</h2>

					<div className={`mt-8 space-y-6 text-base leading-relaxed ${textMuted}`}>
						<p>
							We&apos;re a community of men who support each other through open conversation and
							self-improvement. We want to make it easier to talk about men&apos;s mental health on
							campus by showing up for students, sharing what we know, and listening.
						</p>
						<p>
							We want members to leave feeling more confident, more self-aware, and in a better place
							than when they walked in. Our meetings are a regular check-in: a chance to see how
							you&apos;re doing and stay accountable with the group.
						</p>
					</div>
				</div>

				<div className="relative order-1 lg:order-2">
					<div className="relative aspect-[4/5] min-h-[320px] overflow-hidden rounded-2xl border border-border bg-surface-elevated">
						<Image
							src="/about/DanielWhyWeJournal.jpg"
							alt="UBC MMHC members in discussion"
							fill
							className="object-cover object-left"
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { CommunityIcon, GritIcon, GrowthIcon } from "@/components/home/PillarIcons";
import { accentIcon, accentLine, textHeading, textMuted } from "@/lib/theme";

interface Pillar {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	imagePosition: string;
}

const PILLARS: readonly Pillar[] = [
	{
		icon: CommunityIcon,
		title: "Community",
		description:
			"Connecting individuals interested in men's mental health and self-improvement through social events, volunteering, and deep discussions.",
		image: "/blogs/CBTDiscussionPic.png",
		imageAlt: "Club members posing together in front of the UBC Men's Mental Health Club banner",
		imagePosition: "object-center",
	},
	{
		icon: GritIcon,
		title: "Grit",
		description:
			"Developing perseverance through regular physical challenges and workouts such as runs and cold plunges.",
		image: "/hero/CabinLakeHike.jpg",
		imageAlt: "Club members climbing a rocky trail on the Cabin Lake hike",
		imagePosition: "object-[50%_60%]",
	},
	{
		icon: GrowthIcon,
		title: "Growth",
		description:
			"Encouraging self-development through action-based discussions, accountability systems, and grit challenges.",
		image: "/blogs/JournalingSession.jpg",
		imageAlt: "Club members writing in their journals during a journaling session",
		imagePosition: "object-[62%_50%]",
	},
];

/** Ease used for the flip and the entrance turn. */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function PillarCard({ pillar, index, inView }: { pillar: Pillar; index: number; inView: boolean }) {
	const [flipped, setFlipped] = useState(false);
	const Icon = pillar.icon;
	const number = String(index + 1).padStart(2, "0");

	return (
		<li
			className={`transition-[opacity,translate,rotate] duration-1000 perspective-[1400px] motion-reduce:transition-none ${EASE} ${
				inView
					? "translate-y-0 opacity-100"
					: "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
			}`}
			style={{ transitionDelay: inView ? `${index * 140}ms` : "0ms" }}
		>
			<div className="group relative aspect-[4/5] w-full">
				<div
					data-flipped={flipped}
					className={`relative h-full w-full transition-transform duration-700 transform-3d motion-reduce:transition-none ${EASE} group-hover:rotate-y-180 data-[flipped=true]:rotate-y-180 motion-reduce:group-hover:rotate-y-0 motion-reduce:data-[flipped=true]:rotate-y-0 ${
						inView ? "" : "-rotate-y-[35deg] motion-reduce:rotate-y-0"
					}`}
				>
					{/* Front: photo */}
					<div
						className={`border-border bg-hero-base absolute inset-0 overflow-hidden rounded-3xl border shadow-lg transition-opacity duration-300 backface-hidden dark:shadow-black/40 ${
							flipped ? "motion-reduce:opacity-0" : ""
						} motion-reduce:group-hover:opacity-0`}
					>
						<Image
							src={pillar.image}
							alt={pillar.imageAlt}
							fill
							sizes="(max-width: 768px) 100vw, 33vw"
							className={`object-cover ${pillar.imagePosition} transition-transform duration-[1200ms] ${EASE} group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
						/>
						<div
							className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
							aria-hidden
						/>
						<div className="absolute inset-x-0 top-0 flex items-center justify-between p-6 text-white/80">
							<span className="font-mono text-sm tracking-widest">{number}</span>
							<span className="text-xs font-medium tracking-widest uppercase">Pillar</span>
						</div>
						<div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
							<h3 className="text-4xl font-semibold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] lg:text-5xl">
								{pillar.title}
							</h3>
							<div className="mt-4 flex items-center gap-3 text-xs font-medium tracking-widest text-white/75 uppercase">
								<span className="h-px w-8 bg-white/60" aria-hidden />
								<span className="hidden [@media(hover:hover)]:inline">Hover to read</span>
								<span className="[@media(hover:hover)]:hidden">Tap to read</span>
							</div>
						</div>
					</div>

					{/* Back: description */}
					<div
						className={`border-border bg-surface-alt absolute inset-0 flex rotate-y-180 flex-col overflow-hidden rounded-3xl border p-6 shadow-lg backface-hidden motion-reduce:rotate-y-0 motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:group-hover:opacity-100 md:p-8 dark:shadow-black/40 ${
							flipped ? "motion-reduce:opacity-100" : ""
						}`}
					>
						<div
							className="text-theme-watermark pointer-events-none absolute top-14 -right-5 text-[11rem] leading-none font-semibold opacity-70 select-none dark:opacity-40"
							aria-hidden
						>
							{number}
						</div>
						<div className="relative flex items-center justify-between">
							<Icon className={`h-10 w-10 ${accentIcon}`} />
							<span className={`font-mono text-sm tracking-widest ${textMuted}`}>{number}</span>
						</div>
						<div className="relative mt-auto">
							<div className={`mb-5 h-px w-10 ${accentLine}`} aria-hidden />
							<h3 className={`mb-4 text-3xl font-semibold tracking-tight ${textHeading}`}>
								{pillar.title}
							</h3>
							<p className={`text-base leading-relaxed ${textMuted}`}>{pillar.description}</p>
						</div>
					</div>
				</div>

				{/* Tap / keyboard toggle. Mouse users flip on hover, so their clicks are ignored. */}
				<button
					type="button"
					aria-pressed={flipped}
					aria-label={`${flipped ? "Show photo for" : "Read about"} ${pillar.title}`}
					onClick={(e) => {
						const isMouse =
							e.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
						if (!isMouse) setFlipped((f) => !f);
					}}
					className="focus-visible:ring-theme-focus focus-visible:ring-offset-page absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:cursor-default"
				/>
			</div>
		</li>
	);
}

export default function PillarsSection() {
	const listRef = useRef<HTMLUListElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<section id="pillars" className="bg-page overflow-x-clip py-32">
			<div className="mx-auto max-w-7xl px-6">
				<div className="max-w-copy mx-auto mb-16 text-center md:mb-20">
					<h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${textHeading}`}>
						Our Three Pillars
					</h2>
					<div className={`mt-4 space-y-1 text-base leading-relaxed md:text-lg ${textMuted}`}>
						<p>Men&apos;s mental health is not something to hide.</p>
						<p>It&apos;s a shared journey, built on community, grit, and growth.</p>
					</div>
				</div>

				<ul
					ref={listRef}
					className="max-w-form mx-auto grid grid-cols-1 gap-8 md:max-w-none md:grid-cols-3 lg:gap-10"
				>
					{PILLARS.map((pillar, index) => (
						<PillarCard key={pillar.title} pillar={pillar} index={index} inView={inView} />
					))}
				</ul>
			</div>
		</section>
	);
}

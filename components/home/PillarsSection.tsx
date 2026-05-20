import { CommunityIcon, GritIcon, GrowthIcon } from "@/components/home/PillarIcons";
import { accentIcon, surfaceCard, textHeading, textMuted } from "@/lib/theme";

const PILLARS = [
	{
		icon: CommunityIcon,
		title: "Community",
		description:
			"Connecting individuals interested in men's mental health and self-improvement through social events, volunteering, and deep discussions.",
	},
	{
		icon: GritIcon,
		title: "Grit",
		description:
			"Developing perseverance through regular physical challenges and workouts such as runs and cold plunges.",
	},
	{
		icon: GrowthIcon,
		title: "Growth",
		description:
			"Encouraging self-development through action-based discussions, accountability systems, and grit challenges.",
	},
] as const;

export default function PillarsSection() {
	return (
		<section id="pillars" className="bg-page py-32">
			<div className="mx-auto max-w-7xl px-6">
				<div className="mx-auto mb-20 max-w-2xl text-center">
					<h2 className={`text-3xl font-semibold tracking-tight md:text-4xl ${textHeading}`}>
						Our Three Pillars
					</h2>
					<div className={`mt-4 space-y-1 text-base leading-relaxed md:text-lg ${textMuted}`}>
						<p>Men&apos;s mental health is not something to hide.</p>
						<p>It&apos;s a shared journey, built on community, grit, and growth,</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
					{PILLARS.map((pillar) => {
						const Icon = pillar.icon;
						return (
							<article
								key={pillar.title}
								className={`p-8 ${surfaceCard}`}
							>
								<Icon className={`mb-5 h-8 w-8 ${accentIcon}`} />
								<h3 className={`mb-3 text-xl font-semibold tracking-tight ${textHeading}`}>{pillar.title}</h3>
								<p className={`text-sm leading-relaxed ${textMuted}`}>{pillar.description}</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

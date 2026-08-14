import Image from "next/image";
import DarkPageShell from "@/components/layout/DarkPageShell";
import PageHeader from "@/components/layout/PageHeader";
import { textHeading, textMuted } from "@/lib/theme";

export default function AboutPage() {
	return (
		<DarkPageShell>
			<main className="px-6 pb-24 pt-28">
				<div className="mx-auto max-w-7xl">
					<PageHeader
						title="About UBC MMHC"
						description="A community of men dedicated to peer support, open discussion, and self-improvement on campus."
					/>

					<section className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-elevated lg:aspect-[4/5]">
							<Image
								src="/about/DanielWhyWeJournal.jpg"
								alt="UBC MMHC members in discussion"
								fill
								className="object-cover object-left"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
						<div>
							<h2 className={`text-2xl font-semibold tracking-tight md:text-3xl ${textHeading}`}>Our Mission</h2>
							<p className={`mt-6 text-base leading-relaxed md:text-lg ${textMuted}`}>
								Mental health issues are very prevalent on university campuses. Generally, the first and
								most difficult step for men in treating their mental health is reaching out and seeking
								help. It is crucial to encourage open conversation and we are striving to be that first
								step for the countless men on campus that feel helpless and uncared for.
							</p>
							<p className={`mt-4 text-base leading-relaxed md:text-lg ${textMuted}`}>
								In the process of promoting admission of mental health issues, and how to start improving,
								we talk about daily habitual activities and behaviour that will, at the least, aid with
								mental health.
							</p>
						</div>
					</section>

					<section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
						<div className="order-2 lg:order-1">
							<h2 className={`text-2xl font-semibold tracking-tight md:text-3xl ${textHeading}`}>Our Impact</h2>
							<p className={`mt-6 text-base leading-relaxed md:text-lg ${textMuted}`}>
								We hope to see a positive impact in the lives of our members, and to have them walk out
								more confident, self-aware, and healthier than they had walked in. We believe that our
								meetings can act as a checkup for our members where they can evaluate their improvement
								and be motivated as a group to take care of their mental wellbeing.
							</p>
						</div>
						<div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-elevated lg:order-2 lg:aspect-[4/5]">
							<Image
								src="/hero/Beachheader.jpg"
								alt="UBC MMHC community outdoors"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
						</div>
					</section>
				</div>
			</main>
		</DarkPageShell>
	);
}

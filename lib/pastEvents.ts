export const EVENT_CATEGORIES = [
	"Outdoor Adventures",
	"Sports & Fitness",
	"Discussions & Wellness",
	"Socials & Community",
	"Study & Academic Support",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface PastEvent {
	id: string;
	title: string;
	date: string;
	category: EventCategory;
	description: string;
	imageUrl?: string;
	instagramUrl?: string;
	photos?: string[];
}

export const pastEvents: PastEvent[] = [
	{
		id: "sample-hike",
		title: "Sample Group Hike",
		date: "2025-07-12",
		category: "Outdoor Adventures",
		description: "An outdoor adventure with the MMHC community.",
	},
	{
		id: "sample-volleyball",
		title: "Sample Volleyball Meetup",
		date: "2025-08-16",
		category: "Sports & Fitness",
		description: "A recreational sports meetup.",
	},
	{
		id: "sample-discussion",
		title: "Sample Discussion Circle",
		date: "2025-10-08",
		category: "Discussions & Wellness",
		description: "A space for conversation and connection.",
	},
	{
		id: "sample-social",
		title: "Sample Community Social",
		date: "2026-03-14",
		category: "Socials & Community",
		description: "An opportunity for members to connect.",
	},
];

"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPostWithAuthor } from "@/app/blog/types";
import { surfaceCard, surfaceCardHover, textHeading, textMuted, textSubtle } from "@/lib/theme";

function formatDate(date: Date) {
	return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function BlogCard({ post, href }: { post: BlogPostWithAuthor; href: string }) {
	return (
		<Link
			href={href}
			className={`flex h-full flex-col overflow-hidden ${surfaceCard} ${surfaceCardHover}`}
		>
			{post.image && (
				<div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200 dark:bg-surface-elevated">
					<Image
						src={post.image}
						alt={post.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
				</div>
			)}
			<div className="flex grow flex-col p-6">
				<div className="mb-3 flex items-start justify-between gap-3">
					<h2 className={`text-lg font-semibold leading-tight ${textHeading}`}>{post.title}</h2>
					<span className={`shrink-0 text-xs ${textSubtle}`}>{formatDate(post.date)}</span>
				</div>
				{post.summary && (
					<p className={`mb-4 line-clamp-3 grow text-sm leading-relaxed ${textMuted}`}>{post.summary}</p>
				)}
				{post.tags && post.tags.length > 0 && (
					<div className="mt-auto flex flex-wrap gap-2 pt-2">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className={`rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-xs ${textMuted}`}
							>
								{tag}
							</span>
						))}
					</div>
				)}
				{post.author && <p className={`mt-3 text-xs ${textSubtle}`}>By {post.author.name}</p>}
			</div>
		</Link>
	);
}

export default function DarkBlogMainPage({
	posts,
	getPostHref,
}: {
	posts: BlogPostWithAuthor[];
	getPostHref: (post: BlogPostWithAuthor) => string;
}) {
	const featured = posts.find((p) => p.isFeatured);
	const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

	return (
		<div className="w-full">
			{featured && (
				<Link
					href={getPostHref(featured)}
					className={`mb-8 flex flex-col overflow-hidden sm:flex-row ${surfaceCard} ${surfaceCardHover}`}
				>
					{featured.image && (
						<div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-200 sm:aspect-auto sm:w-2/5 sm:min-h-[180px] dark:bg-surface-elevated">
							<Image
								src={featured.image}
								alt={featured.title}
								fill
								className="object-cover"
								priority
								sizes="(max-width: 640px) 100vw, 40vw"
							/>
						</div>
					)}
					<div className="flex flex-col justify-center p-5 sm:w-3/5 sm:p-6">
						<span className={`mb-2 inline-block text-xs font-semibold uppercase tracking-widest ${textMuted}`}>
							Featured
						</span>
						<h2 className={`text-xl font-semibold tracking-tight md:text-2xl ${textHeading}`}>{featured.title}</h2>
						{featured.summary && (
							<p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${textMuted}`}>{featured.summary}</p>
						)}
						{featured.author && (
							<p className={`mt-2 text-xs ${textSubtle}`}>By {featured.author.name}</p>
						)}
						<span className="mt-4 inline-block text-sm font-medium text-page-fg">
							Read more →
						</span>
					</div>
				</Link>
			)}

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{rest.map((post) => (
					<BlogCard key={post.slug} post={post} href={getPostHref(post)} />
				))}
			</div>
		</div>
	);
}

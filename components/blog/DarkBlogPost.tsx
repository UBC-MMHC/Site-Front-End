"use client";

import Image from "next/image";
import Link from "next/link";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import type { BlogPostWithAuthor } from "@/app/blog/types";
import { textHeading, textMuted, textSubtle } from "@/lib/theme";

const markdownComponents: Components = {
	h1: ({ children }) => <h1 className={`mb-6 mt-10 text-3xl font-semibold ${textHeading}`}>{children}</h1>,
	h2: ({ children }) => <h2 className={`mb-4 mt-8 text-2xl font-semibold ${textHeading}`}>{children}</h2>,
	p: ({ children }) => <p className={`mb-4 text-base leading-relaxed ${textMuted}`}>{children}</p>,
	a: ({ children, href }) => (
		<a href={href} className="text-page-fg underline underline-offset-4 hover:opacity-80">
			{children}
		</a>
	),
	img: ({ src, alt }) =>
		typeof src === "string" ? (
			// eslint-disable-next-line @next/next/no-img-element
			<img src={src} alt={alt ?? ""} className="my-6 w-full rounded-xl" />
		) : null,
};

function formatDate(date: Date) {
	return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function DarkBlogPost({ post }: { post: BlogPostWithAuthor }) {
	return (
		<article className="w-full">
			{post.image && (
				<div className="relative mb-10 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-zinc-200 dark:bg-surface-elevated">
					<Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
				</div>
			)}

			<h1 className={`mb-4 text-3xl font-semibold tracking-tight md:text-5xl ${textHeading}`}>{post.title}</h1>

			<div className={`mb-8 flex flex-wrap items-center gap-4 text-sm ${textSubtle}`}>
				<span>{formatDate(post.date)}</span>
				{post.tags?.length > 0 && (
					<div className="flex flex-wrap gap-2">
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
			</div>

			{post.author && <p className={`mb-6 text-sm ${textSubtle}`}>By {post.author.name}</p>}

			{post.summary && (
				<p className="mb-8 border-l-2 border-theme-line pl-6 text-lg italic text-fg-muted">
					{post.summary}
				</p>
			)}

			<div className="max-w-none">
				<ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
			</div>

			<Link
				href="/blog"
				className={`mt-12 inline-flex items-center gap-2 border-t border-border pt-8 text-sm font-medium transition-colors hover:text-page-fg ${textMuted}`}
			>
				← Back to blog
			</Link>
		</article>
	);
}

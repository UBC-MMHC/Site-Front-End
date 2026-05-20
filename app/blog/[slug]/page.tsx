"use client";

import { useParams } from "next/navigation";
import DarkBlogPost from "@/components/blog/DarkBlogPost";
import DarkPageShell from "@/components/layout/DarkPageShell";
import Link from "next/link";
import { BLOG_POSTS } from "../blogData";

export default function BlogPostPage() {
	const params = useParams();
	const slug = params.slug as string;
	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		return (
			<DarkPageShell>
				<main className="flex min-h-[60vh] items-center justify-center px-6 pt-28">
					<div className="text-center">
						<h1 className="mb-4 text-3xl font-semibold text-white">Post not found</h1>
						<Link
							href="/blog"
							className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
						>
							← Back to blog
						</Link>
					</div>
				</main>
			</DarkPageShell>
		);
	}

	return (
		<DarkPageShell>
			<main className="px-6 pb-24 pt-28">
				<div className="mx-auto max-w-3xl">
					<DarkBlogPost post={post} />
				</div>
			</main>
		</DarkPageShell>
	);
}

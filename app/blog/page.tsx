"use client";

import DarkBlogMainPage from "@/components/blog/DarkBlogMainPage";
import DarkPageShell from "@/components/layout/DarkPageShell";
import PageHeader from "@/components/layout/PageHeader";
import type { BlogPostWithAuthor } from "./types";
import { BLOG_POSTS } from "./blogData";

export default function BlogPage() {
	return (
		<DarkPageShell>
			<main className="px-6 pb-24 pt-28">
				<div className="mx-auto max-w-7xl">
					<PageHeader
						title="Blog"
						description="Reflections, updates, and perspectives from the UBC MMHC community."
					/>

					{BLOG_POSTS?.length > 0 ? (
						<DarkBlogMainPage
							posts={BLOG_POSTS}
							getPostHref={(post: BlogPostWithAuthor) => `/blog/${post.slug}`}
						/>
					) : (
						<div className="rounded-2xl border border-dashed border-border px-8 py-16 text-center">
							<p className="font-medium text-page-fg">No posts yet.</p>
							<p className="mt-2 text-sm text-fg-muted">Check back soon for new articles.</p>
						</div>
					)}
				</div>
			</main>
		</DarkPageShell>
	);
}

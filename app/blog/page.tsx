"use client";

import DarkBlogMainPage from "@/components/blog/DarkBlogMainPage";
import DarkPageShell from "@/components/layout/DarkPageShell";
import PageHeader from "@/components/layout/PageHeader";
import type { BlogPostWithAuthor } from "./types";
import { BLOG_POSTS } from "./blogData";

export default function BlogPage() {
	return (
		<DarkPageShell>
			<main className="px-6 pt-28 pb-24">
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
						<div className="border-border rounded-2xl border border-dashed px-8 py-16 text-center">
							<p className="text-page-fg font-medium">No posts yet.</p>
							<p className="text-fg-muted mt-2 text-sm">Check back soon for new articles.</p>
						</div>
					)}
				</div>
			</main>
		</DarkPageShell>
	);
}

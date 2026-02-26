"use client";

import React from "react";
import { BlogMainPage } from "@ubc-mmhc/blog-frontend";
import type { BlogPostType } from "@ubc-mmhc/blog-frontend";
import { BLOG_POSTS } from "./blogData";

export default function BlogPage(): React.ReactElement {
	return (
		<div className="flex min-h-screen w-full flex-col items-center px-4 pt-24">
			{BLOG_POSTS?.length > 0 ? (
				<div className="max-w-4xl">
					<BlogMainPage
						posts={BLOG_POSTS}
						getPostHref={function (post: BlogPostType): string {
							return `/blog/${post.slug}`;
						}}
					/>
				</div>
			) : (
				// Remove this case and ternary once blog handles this case
				<div>
					<p className="text-secondary-text text-xl leading-relaxed">
						No blogs found, please try again later.
					</p>
				</div>
			)}
		</div>
	);
}

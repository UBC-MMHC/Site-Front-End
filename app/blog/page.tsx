"use client";

import React from "react";
import { BlogMainPage } from "blog-frontend";
import type { BlogPostType } from "../../packages/blog-frontend/dist";
import { TEST_POSTS } from "./testdata";

export default function BlogPage(): React.ReactElement {
	return (
		<div className="flex min-h-screen flex-col items-center px-4 pt-24">
			<BlogMainPage
				posts={TEST_POSTS}
				getPostHref={function (post: BlogPostType): string {
					return `/blog/${post.slug}`;
				}}
			/>
		</div>
	);
}

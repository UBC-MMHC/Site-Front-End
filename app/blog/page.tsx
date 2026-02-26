"use client";

import React from "react";
import { BlogMainPage } from "@ubc-mmhc/blog-frontend";
import type { BlogPostType } from "@ubc-mmhc/blog-frontend";
import { TEST_POSTS } from "./testdata";

export default function BlogPage(): React.ReactElement {
	return (
		<div className="flex min-h-screen w-full flex-col items-center px-4 pt-24">
			<div className="max-w-4xl">
				<BlogMainPage
					posts={TEST_POSTS}
					getPostHref={function (post: BlogPostType): string {
						return `/blog/${post.slug}`;
					}}
				/>
			</div>
		</div>
	);
}

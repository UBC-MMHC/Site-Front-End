"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogPost } from "@ubc-mmhc/blog-frontend";
import { BLOG_POSTS } from "../blogData";
import { BlogAuthorBadge } from "@/components/blog/BlogAuthorBadge";

export default function BlogPostPage(): React.ReactElement {
	const params = useParams();
	const router = useRouter();
	const slug = params.slug as string;

	const post = BLOG_POSTS.find((p) => p.slug === slug);

	if (!post) {
		return (
			<div className="bg-secondary flex min-h-screen items-center justify-center pt-24">
				<div className="text-center">
					<h1 className="mb-4 text-3xl font-bold text-gray-900">Post not found</h1>
					<button
						onClick={() => router.push("/blog")}
						className="font-medium text-gray-700 hover:text-gray-900"
					>
						Back to blog
					</button>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="bg-primary-bg pt-24"></div>
			<div className="bg-secondary flex min-h-screen flex-col items-center justify-center">
				<div className="flex w-full max-w-4xl flex-col gap-4 px-4">
					{post.author && <BlogAuthorBadge author={post.author} />}
					<BlogPost post={post} onBackClick={() => router.push("/blog")} />
				</div>
			</div>
		</>
	);
}

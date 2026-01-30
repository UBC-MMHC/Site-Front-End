"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { BlogPostComponent } from "../../../packages/blog-frontend/dist/containers/BlogPost";
import { TEST_POSTS } from "../testdata";

export default function BlogPostPage(): React.ReactElement {
	const params = useParams();
	const router = useRouter();
	const slug = params.slug as string;

	const post = TEST_POSTS.find((p) => p.slug === slug);

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
			<div className="bg-secondary flex min-h-screen items-center justify-center">
				<BlogPostComponent post={post} onBackClick={() => router.push("/blog")} />
			</div>
		</>
	);
}

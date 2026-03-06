import type { BlogPostType } from "@ubc-mmhc/blog-frontend";

export interface BlogAuthor { name: string }
export type BlogPostWithAuthor = BlogPostType & { author?: BlogAuthor };

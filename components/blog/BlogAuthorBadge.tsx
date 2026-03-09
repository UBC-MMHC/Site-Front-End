import React from "react";
import type { BlogAuthor } from "@/app/blog/types";

interface BlogAuthorBadgeProps {
	author: BlogAuthor;
}

export function BlogAuthorBadge({ author }: BlogAuthorBadgeProps): React.ReactElement {
	return <p className="text-muted-foreground text-sm">By {author.name}</p>;
}

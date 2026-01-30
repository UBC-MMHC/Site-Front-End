import type { BlogPost } from "../../packages/blog-frontend/dist/types";

export const TEST_POSTS: BlogPost[] = [
	{
		slug: "getting-started",
		title: "Getting Started with React",
		summary: "Learn the basics of React and how to set up your first project.",
		content: `
# Getting Started with React

React is a popular JavaScript library for building user interfaces. It allows you to create **reusable components** and manage state efficiently. If you’re completely new to React, start by setting up a project using Create React App or Vite.

## Why React?

- Declarative: React makes it easy to design interactive UIs.
- Component-based: Build encapsulated components that manage their own state.
- Learn once, write anywhere: React can be used for web, mobile, and even VR.

![Beach Run](/events/BeachRunGroup.jpeg)

## Creating Your First Component

Here’s a simple React component:

\`\`\`jsx
function HelloWorld() {
  return <h1>Hello, world!</h1>;
}
\`\`\`

Save this as \`HelloWorld.js\` and import it into your \`App.js\`.

## State and Hooks

State allows your components to **remember information**. For more advanced state management, check out our [State Hooks Guide](/blog/state-hooks).

![Sample Component](/DanielWhyWeJournal.jpg)

## Next Steps

After you understand components and state, try building a small project, like a **to-do list** or a **blog post viewer**. Remember to experiment with props, events, and conditional rendering.

React has a steep learning curve at first, but with practice you’ll be able to create dynamic and responsive applications quickly.

`,
		isFeatured: true,
		date: new Date("2024-01-15"),
		image: "/hero/beachheader.jpg",
		tags: ["React", "JavaScript", "Beginner"],
	},

	{
		slug: "state-hooks",
		title: "Understanding React Hooks",
		summary: "Deep dive into useState, useEffect, and custom hooks.",
		content: "# React Hooks\n\nHooks let you use state and other React features.",
		date: new Date("2024-01-20"),
		image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
		tags: ["React", "Hooks", "Advanced"],
		isFeatured: false,
	},
	{
		slug: "next-js-guide",
		title: "Next.js for Beginners",
		summary: "Build full-stack applications with Next.js.",
		content: "# Next.js\n\nNext.js is a React framework for production.",
		date: new Date("2024-01-25"),
		image: "/events/BeachRunGroup.jpeg",
		tags: ["Next.js", "Framework", "Full-stack"],
		isFeatured: false,
	},
	{
		slug: "typescript-tips",
		title: "TypeScript Best Practices",
		summary: "Write safer, more maintainable TypeScript code.",
		content: "# TypeScript Tips\n\nType safety improves code quality.",
		date: new Date("2024-02-01"),
		image: "/hero/DiscussionHero.JPG",
		tags: ["TypeScript", "Best Practices", "Code Quality"],
		isFeatured: false,
	},
];

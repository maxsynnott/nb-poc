import type { LiquidPageContext } from "../../../types";

export default {
	page: {
		title: "Posts",
	},
	posts: [
		{
			title: "Post 1",
			content: "This is the first post.",
			liked: false,
		},
		{
			title: "Post 2",
			content: "This is the second post.",
			liked: true,
		},
		{
			title: "Post 3",
			content: "This is the third post.",
			liked: false,
		},
	],
} satisfies LiquidPageContext;

import { expect, test } from "@playwright/test";

test("renders the posts page and handles likes", async ({ page }) => {
	await page.goto("/posts");

	await expect(page.getByRole("heading", { level: 1 })).toHaveText("Posts");
	await expect(page.locator("article")).toHaveCount(3);

	const firstLikeButton = page.getByRole("button", { name: "Like" }).first();

	await expect(firstLikeButton).toHaveAttribute("data-liked", "false");
	await firstLikeButton.click();
	await expect(firstLikeButton).toHaveAttribute("data-liked", "true");
});

import "../../../shared/styles/globals.css";
import { capitalize } from "../../../shared/scripts/capitalize";

import "../styles/index.css";

const likeButtons = document.querySelectorAll(".like-button");
const likesCountElement = document.getElementById("likes-count");

const updateLikesCount = () => {
	if (!likesCountElement) return;

	const likedButtonCount = Array.from(likeButtons).filter(
		(button) => button.getAttribute("data-liked") === "true",
	).length;
	likesCountElement.textContent = likedButtonCount.toString();
};

updateLikesCount();

for (const likeButton of likeButtons) {
	likeButton.addEventListener("click", () => {
		const liked = likeButton.getAttribute("data-liked") === "true";
		likeButton.setAttribute("data-liked", (!liked).toString());
		updateLikesCount();
	});
}

console.log(capitalize("hello world!"));

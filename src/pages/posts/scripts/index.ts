import "../../../shared/styles/globals.css";
import { capitalize } from "../../../shared/scripts/capitalize";

import "../styles/index.css";

const likeButtons = document.querySelectorAll(".like-button");
for (const likeButton of likeButtons) {
	likeButton.addEventListener("click", () => {
		const liked = likeButton.getAttribute("data-liked") === "true";
		likeButton.setAttribute("data-liked", (!liked).toString());
	});
}

console.log(capitalize("hello world!"));

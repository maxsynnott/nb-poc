const pages = import.meta.glob("./pages/**/index.liquid", {
	query: "?raw",
	import: "default",
});

const routes = Object.keys(pages)
	.map((filePath) => {
		return filePath.replace("./pages", "").replace("/index.liquid", "");
	})
	.sort();

const linksListElement = document.querySelector("#links-list");

if (linksListElement) {
	linksListElement.innerHTML = routes
		.map((route) => `<li><a href="${route}">${route}</a></li>`)
		.join("");
}

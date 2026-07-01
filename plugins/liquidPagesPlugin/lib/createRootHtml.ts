import type { Page } from "./discoverPages";

export const createRootHtml = (pages: Page[]): string => {
	const links = pages
		.filter((page) => page.route !== "/")
		.sort((a, b) => a.route.localeCompare(b.route))
		.map((page) => {
			return `<li><a href="${page.route}">${page.route}</a></li>`;
		})
		.join("\n");

	return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Liquid Pages</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        max-width: 720px;
        margin: 48px auto;
        padding: 0 24px;
      }

      a {
        color: inherit;
      }

      li {
        margin-block: 8px;
      }
    </style>
  </head>
  <body>
    <h1>Liquid Pages</h1>
    <ul>
      ${links}
    </ul>
  </body>
</html>`;
};

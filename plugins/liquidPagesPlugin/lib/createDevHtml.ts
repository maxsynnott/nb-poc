import type { ResolvedConfig } from "vite";
import type { Page } from "./discoverPages";
import { toDevUrl } from "./toDevUrl";

type CreateDevHtmlInput = {
	page: Page;
	body: string;
	config: ResolvedConfig;
};

export const createDevHtml = ({
	page,
	body,
	config,
}: CreateDevHtmlInput): string => {
	const scriptTag = page.jsPath
		? `<script type="module" src="${toDevUrl({ config, filePath: page.jsPath })}"></script>`
		: "";

	return `
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
  	<main>${body}</main>
    
	${scriptTag}
  </body>
</html>
`;
};

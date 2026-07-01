# Liquid Pages Vite POC

A small proof of concept for building Liquid pages with Vite.

The custom Vite plugin discovers `index.liquid` files in `src/pages`, serves
them as routes during development, and bundles each page's JavaScript and CSS
into a Liquid file in `dist` for production.

## Page structure

Each page is a directory under `src/pages` with this structure:

```text
src/pages/posts/
├── index.liquid
├── context/
│   └── index.ts
├── scripts/
│   └── index.ts
└── styles/
    └── index.css
```

The directory path becomes the route, so the example above is available at
`/posts`.

The TypeScript entry point is expected to import the page's CSS:

```ts
import "../styles/index.css";
```

The context file default-exports the sample data used to render the Liquid
template during development:

```ts
import type { LiquidPageContext } from "../../../types";

export default {
	page: {
		title: "Posts",
	},
	posts: [],
} satisfies LiquidPageContext;
```

## Shared code

The demo posts page also shows how pages can use shared code. Its TypeScript
entry point imports the shared `capitalize` function and global stylesheet:

```ts
import "../../../shared/styles/globals.css";
import { capitalize } from "../../../shared/scripts/capitalize";
```

Vite follows these imports, so the shared TypeScript and CSS are included when
the page is served during development and bundled into its build output.

## Development

During development, the plugin loads the page's context, renders the Liquid
template to HTML, wraps it in an HTML document, and serves it through Vite. This
provides normal Vite development features such as module loading and live
reload.

```sh
npm run dev
```

## Build

During a build, the template is not rendered to HTML. Instead, the page's
JavaScript and CSS are bundled and inlined alongside the original Liquid markup:

```text
dist/pages/posts/index.liquid
```

The resulting `.liquid` file keeps its Liquid expressions so it can be rendered
later by the target Liquid environment. The development context is not included
in the build output.

```sh
npm run build
```

## Testing

The repository includes examples of both unit tests with Vitest and end-to-end
tests with Playwright.

```sh
npm run test:unit
npm run test:e2e
```

## Flexibility

The page structure and plugin are intentionally flexible so they can be adapted
to the existing pages we import, rather than requiring those pages to fit one
fixed frontend setup. Each page can bring across its own scripts, styles, shared
code, and npm dependencies.

Because the build is based on Vite, it can also be adjusted to fit different
development workflows and tools, including framework plugins, CSS processors,
testing tools, linting, and other project-specific requirements.

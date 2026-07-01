import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import path from "node:path";
import fs from "node:fs/promises";
import { Liquid } from "liquidjs";
import { bundleJs } from "./lib/bundleJs";
import { createDevHtml } from "./lib/createDevHtml";
import { discoverPages, type Page } from "./lib/discoverPages";
import { loadDevContext } from "./lib/loadDevContext";

export const liquidPagesPlugin = (options: { pagesDir: string }): Plugin => {
	let config: ResolvedConfig;
	let pages: Page[];

	const liquid = new Liquid({
		cache: false,
	});

	return {
		name: "liquid-pages",

		configResolved: async (resolvedConfig) => {
			config = resolvedConfig;
			pages = await discoverPages({ config, pagesDir: options.pagesDir });
			console.log(
				"Discovered pages:",
				pages.map((page) => page.route),
			);
		},

		configureServer: (server: ViteDevServer) => {
			server.watcher.add(path.resolve(config.root, options.pagesDir));

			server.watcher.on("change", async (file) => {
				pages = await discoverPages({ config, pagesDir: options.pagesDir });

				server.ws.send({
					type: "full-reload",
				});
			});

			server.middlewares.use(async (req, res, next) => {
				const url = req.url?.split("?").at(0);

				if (!url) {
					return next();
				}

				const page = pages.find((page) => page.route === url);

				if (!page) {
					return next();
				}

				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html");

				const source = await fs.readFile(page.liquidPath, "utf8");
				const context = await loadDevContext({ config, page, server });

				const renderedHtml = await liquid.parseAndRender(source, context);

				const html = createDevHtml({
					page,
					body: renderedHtml,
					config,
				});
				const transformedHtml = await server.transformIndexHtml(url, html);

				res.end(transformedHtml);
			});
		},

		closeBundle: async () => {
			if (config.command !== "build") {
				return;
			}

			const outDir = path.resolve(config.root, config.build.outDir);

			for (const page of pages) {
				const liquid = await fs.readFile(page.liquidPath, "utf8");

				const { jsCode, cssSource } = await bundleJs({
					entry: page.jsPath,
					config,
				});

				const finalLiquid = [
					`<style>${cssSource}</style>`,
					liquid,
					`<script type="module">${jsCode}</script>`,
				].join("\n");

				const outputPath = path.resolve(
					outDir,
					options.pagesDir,
					page.relativeDir,
					"index.liquid",
				);

				await fs.mkdir(path.dirname(outputPath), {
					recursive: true,
				});

				await fs.writeFile(outputPath, finalLiquid);
			}

			await fs.rm(path.resolve(outDir, "index.html"), {
				force: true,
			});

			await fs.rm(path.resolve(outDir, "assets"), {
				recursive: true,
				force: true,
			});
		},
	};
};

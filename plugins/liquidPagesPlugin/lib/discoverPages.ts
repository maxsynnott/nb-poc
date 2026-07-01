import fg from "fast-glob";
import path from "node:path";
import type { ResolvedConfig } from "vite";
import { toPosix } from "./toPosix";

type DiscoverPagesInput = {
	config: ResolvedConfig;
	pagesDir: string;
};

export type Page = {
	route: string;
	relativeDir: string;
	liquidPath: string;
	contextPath: string;
	jsPath: string;
};

export const discoverPages = async ({
	config,
	pagesDir,
}: DiscoverPagesInput): Promise<Page[]> => {
	const absolutePagesDir = path.resolve(config.root, pagesDir);

	const liquidFiles = await fg("**/index.liquid", {
		cwd: absolutePagesDir,
		absolute: true,
	});

	return liquidFiles.map((liquidPath) => {
		const dir = path.dirname(liquidPath);
		const relativeDir = toPosix(path.relative(absolutePagesDir, dir));
		const route = `/${toPosix(relativeDir)}`;
		const jsPath = path.resolve(dir, "scripts/index.ts");
		const contextPath = path.resolve(dir, "context/index.ts");

		return {
			route,
			relativeDir,
			liquidPath,
			jsPath,
			contextPath,
		};
	});
};

import type { ResolvedConfig, ViteDevServer } from "vite";
import type { Page } from "./discoverPages";
import { toDevUrl } from "./toDevUrl";

type LoadDevContextInput = {
	page: Page;
	server: ViteDevServer;
	config: ResolvedConfig;
};

export const loadDevContext = async ({
	page,
	server,
	config,
}: LoadDevContextInput): Promise<Record<string, unknown>> => {
	const module = await server.ssrLoadModule(
		toDevUrl({ config, filePath: page.contextPath }),
	);

	return module.default ?? {};
};

import { build as viteBuild, type InlineConfig, type ResolvedConfig } from "vite";
import { normalizeViteBuildOutput } from "./normalizeViteBuildOutput";

type BundleJsInput = {
	config: ResolvedConfig;
	entry: string;
};

export const bundleJs = async ({
	config,
	entry,
}: BundleJsInput): Promise<{
	jsCode: string;
	cssSource: string | undefined;
}> => {
	const buildConfig: InlineConfig = {
		root: config.root,
		configFile: false,
		publicDir: false,
		logLevel: "silent",

		build: {
			write: false,
			minify: config.build.minify,
			cssCodeSplit: false,
			lib: {
				entry,
				fileName: "script",
				formats: ["es"],
			},
		},
	};

	const result = await viteBuild(buildConfig);

	const outputs = normalizeViteBuildOutput(result);

	if (outputs.length > 2) {
		throw new Error(
			`Expected at most 2 outputs (JS and CSS), but got ${outputs.length}`,
		);
	}

	let jsCode;
	let cssSource;

	for (const output of outputs) {
		if (output.type === "chunk" && output.fileName.endsWith(".js")) {
			jsCode = output.code;
		} else if (output.type === "asset" && output.fileName.endsWith(".css")) {
			if (typeof output.source !== "string") {
				throw new Error("CSS asset source is not a string");
			}
			cssSource = output.source;
		}
	}

	if (jsCode === undefined) {
		throw new Error("No JS chunk found in Vite build output");
	}

	if (cssSource === undefined) {
		throw new Error("CSS asset source is not a string");
	}

	return { jsCode, cssSource };
};

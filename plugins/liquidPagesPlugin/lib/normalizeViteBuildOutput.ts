import { build as viteBuild } from "vite";

type BuildOutput = Awaited<ReturnType<typeof viteBuild>>;

export const normalizeViteBuildOutput = (output: BuildOutput) => {
	if (Array.isArray(output)) {
		return output.flatMap((item) => item.output);
	} else if ("output" in output) {
		return output.output;
	}

	throw new Error("Unexpected Vite build output format");
};

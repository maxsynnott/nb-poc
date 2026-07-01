import path from "node:path";
import type { ResolvedConfig } from "vite";
import { toPosix } from "./toPosix";

type ToDevUrlInput = {
	config: ResolvedConfig;
	filePath: string;
};

export const toDevUrl = ({
	config,
	filePath,
}: ToDevUrlInput): string => {
	return `/${toPosix(path.relative(config.root, filePath))}`;
};

import path from "node:path";

export const toPosix = (value: string): string => {
	return value.split(path.sep).join("/");
};

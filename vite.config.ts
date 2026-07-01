import { defineConfig } from "vite";
import { liquidPagesPlugin } from "./plugins/liquidPagesPlugin";

export default defineConfig({
	root: "src",

	build: {
		outDir: "../dist",
		emptyOutDir: true,
		manifest: false,
	},

	plugins: [liquidPagesPlugin({ pagesDir: "pages" })],
});

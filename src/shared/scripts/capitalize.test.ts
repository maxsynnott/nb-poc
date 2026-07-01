import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
	it("capitalizes the first character", () => {
		expect(capitalize("hello world!")).toBe("Hello world!");
	});
});

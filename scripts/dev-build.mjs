import fs from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import meta from "../package.json" assert { type: "json" };

(async () => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));

	const buildVersion = `${meta.version}.debug-${Number(new Date)}`;

	fs.writeFileSync("./build_version.txt", buildVersion);

	await execa(
		"pnpm", [
			"--recursive",
			"--parallel",
			"--filter=backend-rs",
			"--filter=firefish-js",
			"run",
			"build:debug",
		], {
			cwd: join(__dirname, "/../"),
			stdio: "inherit",
		}
	);

	await execa(
		"pnpm",	[
			"--recursive",
			"--parallel",
			"--filter=!backend-rs",
			"--filter=!firefish-js",
			"run",
			"build:debug",
		], {
			cwd: join(__dirname, "/../"),
			stdio: "inherit",
		}
	);

	fs.copyFileSync("packages/backend-rs/index.js", "packages/backend-rs/built/index.js");
})();

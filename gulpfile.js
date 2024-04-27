/**
 * Gulp tasks
 */

const fs = require("fs");
const gulp = require("gulp");
const replace = require("gulp-replace");
const terser = require("gulp-terser");
const cssnano = require("gulp-cssnano");

const meta = require("./package.json");

gulp.task("copy:backend:views", () =>
	gulp
		.src("./packages/backend/src/server/web/views/**/*")
		.pipe(gulp.dest("./packages/backend/built/server/web/views")),
);

gulp.task("copy:backend:custom", () =>
	gulp
		.src("./custom/assets/**/*")
		.pipe(gulp.dest("./packages/backend/assets/")),
);

gulp.task("copy:client:fonts", () =>
	gulp
		.src("./packages/client/node_modules/three/examples/fonts/**/*")
		.pipe(gulp.dest("./built/_client_dist_/fonts/")),
);

gulp.task("copy:client:locales", async (cb) => {
	try {
		fs.rmSync("./built/_client_dist_/locales/", { recursive: true });
	} catch (_e) {};
	fs.mkdirSync("./built/_client_dist_/locales", { recursive: true });

	const buildVersion = fs.readFileSync("./build_version.txt").toString();
	
	const { default: locales } = await import("./locales/index.mjs");

	const v = { _version_: buildVersion };

	for (const [lang, locale] of Object.entries(locales)) {
		fs.writeFileSync(
			`./built/_client_dist_/locales/${lang}.${buildVersion}.json`,
			JSON.stringify({ ...locale, ...v }),
			"utf-8",
		);
	}

	cb();
});

gulp.task("build:backend:script", async () => {
	const { default: locales } = await import("./locales/index.mjs");

	return gulp
		.src([
			"./packages/backend/src/server/web/boot.js",
			"./packages/backend/src/server/web/bios.js",
			"./packages/backend/src/server/web/cli.js",
		])
		.pipe(replace("SUPPORTED_LANGS", JSON.stringify(Object.keys(locales))))
		.pipe(
			terser({
				toplevel: true,
			}),
		)
		.pipe(gulp.dest("./packages/backend/built/server/web/"));
});

gulp.task("build:backend:style", () => {
	return gulp
		.src([
			"./packages/backend/src/server/web/style.css",
			"./packages/backend/src/server/web/bios.css",
			"./packages/backend/src/server/web/cli.css",
		])
		.pipe(
			cssnano({
				zindex: false,
			}),
		)
		.pipe(gulp.dest("./packages/backend/built/server/web/"));
});

gulp.task(
	"build",
	gulp.parallel(
		"copy:client:locales",
		"copy:backend:views",
		"copy:backend:custom",
		"build:backend:script",
		"build:backend:style",
		"copy:client:fonts",
	),
);

gulp.task("default", gulp.task("build"));

gulp.task("watch", () => {
	gulp.watch(
		["./packages/*/src/**/*"],
		{ ignoreInitial: false },
		gulp.task("build"),
	);
});

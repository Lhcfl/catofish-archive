import type Koa from "koa";
import { fetchMeta } from "backend-rs";
import { config } from "@/config.js";
import manifest from "./manifest.json" assert { type: "json" };

interface Manifest {
	short_name: string;
	name: string;
	description: string;
	start_url: string;
	scope: string;
	display: string;
	background_color: string;
	theme_color: string;
	orientation: string;
	icons: {
		src: string;
		sizes?: string;
		type?: string;
		purpose?: "any" | "maskable" | "monochrome";
	}[];
	share_target: {
		action: "/share/";
		params: {
			title: "title";
			text: "text";
			url: "url";
		};
	};
	screenshots: {
		src: string;
		sizes: string;
		type: string;
		platform: string;
		label: string;
	}[];
	shortcuts: {
		name: string;
		short_name?: string;
		url: string;
	}[];
	categories: string[];
}

export const manifestHandler = async (ctx: Koa.Context) => {
	// TODO
	//const res = structuredClone(manifest);
	const res: Manifest = JSON.parse(JSON.stringify(manifest));

	const instance = await fetchMeta(false);

	res.short_name = instance.name || "Firefish";
	res.name = instance.name || "Firefish";

	if (instance.iconUrl) {
		res.icons = [
			{
				src: instance.iconUrl,
				sizes: "48x48 72x72 96x96 128x128 192x192 256x256",
				purpose: "any",
			},
		];
	} else {
		for (const icon of res.icons) {
			icon.src = `${icon.src}?v=${config.version.replace(/[^0-9]/g, "")}`;
		}
	}

	if (instance.themeColor) res.theme_color = instance.themeColor;

	for (const screenshot of res.screenshots) {
		screenshot.src = `${screenshot.src}?v=${config.version.replace(
			/[^0-9]/g,
			"",
		)}`;
	}
	ctx.set("Cache-Control", "max-age=300");
	ctx.body = res;
};

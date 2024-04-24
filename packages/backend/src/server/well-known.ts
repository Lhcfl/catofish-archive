import Router from "@koa/router";

import { config } from "@/config.js";
import { type Acct, stringToAcct } from "backend-rs";
import { links } from "./nodeinfo.js";
import { escapeAttribute, escapeValue } from "@/prelude/xml.js";
import { Users } from "@/models/index.js";
import type { User } from "@/models/entities/user.js";
import type { FindOptionsWhere } from "typeorm";
import { IsNull } from "typeorm";

// Init router
const router = new Router();

const XRD = (
	...x: {
		element: string;
		value?: string;
		attributes?: Record<string, string>;
	}[]
) =>
	`<?xml version="1.0" encoding="UTF-8"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">${x
		.map(
			({ element, value, attributes }) =>
				`<${Object.entries(
					(typeof attributes === "object" && attributes) || {},
				).reduce((a, [k, v]) => `${a} ${k}="${escapeAttribute(v)}"`, element)}${
					typeof value === "string" ? `>${escapeValue(value)}</${element}` : "/"
				}>`,
		)
		.reduce((a, c) => a + c, "")}</XRD>`;

const allPath = "/.well-known/(.*)";
const webFingerPath = "/.well-known/webfinger";
const jrd = "application/jrd+json";
const xrd = "application/xrd+xml";

router.use(allPath, async (ctx, next) => {
	ctx.set({
		"Access-Control-Allow-Headers": "Accept",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Expose-Headers": "Vary",
	});
	await next();
});

router.options(allPath, async (ctx) => {
	ctx.status = 204;
});

router.get("/.well-known/host-meta", async (ctx) => {
	ctx.set("Content-Type", xrd);
	ctx.body = XRD({
		element: "Link",
		attributes: {
			rel: "lrdd",
			type: xrd,
			template: `${config.url}${webFingerPath}?resource={uri}`,
		},
	});
});

router.get("/.well-known/host-meta.json", async (ctx) => {
	ctx.set("Content-Type", jrd);
	ctx.body = {
		links: [
			{
				rel: "lrdd",
				type: jrd,
				template: `${config.url}${webFingerPath}?resource={uri}`,
			},
		],
	};
});

router.get("/.well-known/nodeinfo", async (ctx) => {
	ctx.body = { links };
});

/* TODO
router.get('/.well-known/change-password', async ctx => {
});
*/

router.get(webFingerPath, async (ctx) => {
	const fromId = (id: User["id"]): FindOptionsWhere<User> => ({
		id,
		host: IsNull(),
		isSuspended: false,
	});

	const generateQuery = (resource: string): FindOptionsWhere<User> | number =>
		resource.startsWith(`${config.url.toLowerCase()}/users/`)
			? fromId(resource.split("/").pop()!)
			: fromAcct(
					stringToAcct(
						resource.startsWith(`${config.url.toLowerCase()}/@`)
							? resource.split("/").pop()!
							: resource.startsWith("acct:")
								? resource.slice("acct:".length)
								: resource,
					),
				);

	const fromAcct = (acct: Acct): FindOptionsWhere<User> | number =>
		!acct.host || acct.host === config.host.toLowerCase()
			? {
					usernameLower: acct.username,
					host: IsNull(),
					isSuspended: false,
				}
			: 422;

	if (typeof ctx.query.resource !== "string") {
		ctx.status = 400;
		return;
	}

	const query = generateQuery(ctx.query.resource.toLowerCase());

	if (typeof query === "number") {
		ctx.status = query;
		return;
	}

	const user = await Users.findOneBy(query);

	if (user == null) {
		ctx.status = 404;
		return;
	}

	const subject = `acct:${user.username}@${config.host}`;
	const self = {
		rel: "self",
		type: "application/activity+json",
		href: `${config.url}/users/${user.id}`,
	};
	const profilePage = {
		rel: "http://webfinger.net/rel/profile-page",
		type: "text/html",
		href: `${config.url}/@${user.username}`,
	};
	const subscribe = {
		rel: "http://ostatus.org/schema/1.0/subscribe",
		template: `${config.url}/authorize-follow?acct={uri}`,
	};

	if (ctx.accepts(jrd, xrd) === xrd) {
		ctx.body = XRD(
			{ element: "Subject", value: subject },
			{ element: "Link", attributes: self },
			{ element: "Link", attributes: profilePage },
			{ element: "Link", attributes: subscribe },
		);
		ctx.type = xrd;
	} else {
		ctx.body = {
			subject,
			links: [self, profilePage, subscribe],
		};
		ctx.type = jrd;
	}

	ctx.vary("Accept");
	ctx.set("Cache-Control", "public, max-age=180");
});

// Return 404 for other .well-known
router.all(allPath, async (ctx) => {
	ctx.status = 404;
});

export default router;

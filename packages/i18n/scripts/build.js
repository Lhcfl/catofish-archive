/**
 * Build I18n types from en-US.yml
 */

import yaml from "js-yaml";
import fs from "node:fs";

const locale = yaml.load(fs.readFileSync("../../locales/en-US.yml"));

function safeStr(str) {
	return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(str) ? str : `"${str}"`;
}

/**
 * 
 * @param {*} obj 
 * @param {string} prefix 
 * @returns {string[]}
 */
function generateKeys(obj, prefix = "") {
	const keys = [];
	for (const [key, o] of Object.entries(obj)) {
		const keyStr = safeStr(`${prefix}${key}`);
		if (typeof o === 'string') {
			const vars = o.match(/\{[A-Za-z0-9_]+\}/g);
			if (vars == null || vars.length === 0) {
				keys.push(`
/** ${o.replaceAll("\n", "  \n * ") } */
${keyStr}: {
	param: Record<string, never>;
	result: ${JSON.stringify(o)};
}`);
			} else {
				keys.push(`
/** ${o.replaceAll("\n", "  \n * ") } */
${keyStr}: {
	param: {
		${
			[...new Set(vars)].map(v => `${v.slice(1, -1)}: any;`).join("\n\t\t")
		}
	};
	result: ${JSON.stringify(o)};
}`);
			}
		} else if (typeof o === 'object') {
			keys.push(generateKeys(o, `${prefix}${key}.`));
		}
	}
	return keys;
}

function generateValues(obj) {
	const keys = [];
	for (const [key, o] of Object.entries(obj)) {
		const keyStr = safeStr(key);
		if (typeof o === 'string') {
			// const vars = o.match(/\{[A-Za-z0-9_]+\}/g);
			keys.push(`\n/** ${o.replaceAll("\n", "  \n * ") } */\n${keyStr}: ${JSON.stringify(o)}`);
		} else if (typeof o === 'object') {
			keys.push(`\n${keyStr}: {\n\t${
				generateValues(o).replaceAll("\n", "\n\t")
			}\n}`);
		}
	}
	return keys.join("\n");
}

const typestr = `
export interface I18nKeys {
	${generateKeys(locale).flat(100).join("\n").replaceAll("\n", "\n\t")}
}

export interface I18nValues {
	${generateValues(locale).replaceAll("\n", "\n\t")}
}`;

fs.mkdirSync("built", { recursive: true });

fs.writeFileSync("built/types.d.ts", typestr);

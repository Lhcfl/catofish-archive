import { utils, values } from "@syuilo/aiscript";
import * as os from "@/os";
import { me } from "@/me";

export function createAiScriptEnv(opts) {
	let apiRequests = 0;
	return {
		USER_ID: me ? values.STR(me.id) : values.NULL,
		USER_NAME: me ? values.STR(me.name) : values.NULL,
		USER_USERNAME: me ? values.STR(me.username) : values.NULL,
		"Mk:dialog": values.FN_NATIVE(async ([title, text, type]) => {
			await os.alert({
				type: type ? type.value : "info",
				title: title.value,
				text: text.value,
			});
			return values.NULL;
		}),
		"Mk:confirm": values.FN_NATIVE(async ([title, text, type]) => {
			const confirm = await os.confirm({
				type: type ? type.value : "question",
				title: title.value,
				text: text.value,
			});
			return confirm.canceled ? values.FALSE : values.TRUE;
		}),
		"Mk:api": values.FN_NATIVE(async ([ep, param, token]) => {
			if (token) {
				utils.assertString(token);
				// バグがあればundefinedもあり得るため念のため
				if (typeof token.value !== "string") throw new Error("invalid token");
			}
			apiRequests++;
			if (apiRequests > 16) return values.NULL;
			const res = await os.api(
				ep.value,
				utils.valToJs(param),
				token ? token.value : opts.token || null,
			);
			return utils.jsToVal(res);
		}),
		"Mk:save": values.FN_NATIVE(([key, value]) => {
			utils.assertString(key);
			localStorage.setItem(
				`aiscript:${opts.storageKey}:${key.value}`,
				JSON.stringify(utils.valToJs(value)),
			);
			return values.NULL;
		}),
		"Mk:load": values.FN_NATIVE(([key]) => {
			utils.assertString(key);
			return utils.jsToVal(
				JSON.parse(
					localStorage.getItem(`aiscript:${opts.storageKey}:${key.value}`),
				),
			);
		}),
		"Mk:url": values.FN_NATIVE(() => {
			return values.STR(window.location.href);
		}),
	};
}

import type { I18nKeys, I18nValues } from "../built/types.d.ts";

const undefinedProxy: object = new Proxy(
	{},
	{
		get() {
			return undefinedProxy;
		},
	},
);

// biome-ignore lint/suspicious/noExplicitAny: used intentially
type ExplicitAny = any;

const makeProxy: <T extends object>(_any: T) => T = (target: ExplicitAny) =>
	new Proxy(target, {
		get(target, prop) {
			if (target[prop] == null) {
				return undefinedProxy;
			}
			if (typeof target[prop] === "object") {
				return makeProxy(target[prop]);
			}
			return target[prop];
		},
	});

export class I18n {
	public ts: I18nValues;
	private _ts: I18nValues;

	constructor(locale: I18nValues) {
		this.ts = makeProxy(locale);
		this._ts = locale;

		// #region BIND
		this.t = this.t.bind(this);
		// #endregion
	}

	// string にしているのは、ドット区切りでのパス指定を許可するため
	// なるべくこのメソッド使うよりもlocale直接参照の方がvueのキャッシュ効いてパフォーマンスが良いかも
	public t<K extends keyof I18nKeys>(
		key: K,
		args?: I18nKeys[K]["param"],
	): I18nKeys[K]["result"] {
		try {
			let str = key
				.split(".")
				.reduce((o, i) => o[i as never], this._ts) as unknown as string;

			if (args) {
				for (const [k, v] of Object.entries(args)) {
					str = str.replaceAll(`{${k}}`, v.toString());
				}
			}
			return str as never;
		} catch (err) {
			console.warn(`missing localization '${key}'`);
			return key as never;
		}
	}
}

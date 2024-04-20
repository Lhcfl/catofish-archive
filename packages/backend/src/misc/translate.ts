import fetch from "node-fetch";
import { Converter } from "opencc-js";
import { getAgentByUrl } from "@/misc/fetch.js";
import { fetchMeta } from "backend-rs";
import type { PostLanguage } from "@/misc/langmap";
import * as deepl from "deepl-node";

// DeepL translate and LibreTranslate don't provide
// zh-Hant-TW translations, so we convert zh-Hans-CN
// translations into zh-Hant-TW using opencc-js.
function convertChinese(convert: boolean, src: string) {
	if (!convert) return src;
	const converter = Converter({ from: "cn", to: "twp" });
	return converter(src);
}

function stem(lang: PostLanguage): string {
	let toReturn = lang as string;
	if (toReturn.includes("-")) toReturn = toReturn.split("-")[0];
	if (toReturn.includes("_")) toReturn = toReturn.split("_")[0];
	return toReturn;
}

export async function translate(
	text: string,
	from: PostLanguage | null,
	to: PostLanguage,
) {
	const instance = await fetchMeta(true);

	const source = from == null ? null : stem(from);
	const target = stem(to);

	if (instance.libreTranslateApiUrl != null) {
		const jsonBody = {
			q: text,
			source: source ?? "auto",
			target,
			format: "text",
			api_key: instance.libreTranslateApiKey ?? "",
		};

		const url = new URL(instance.libreTranslateApiUrl);
		if (url.pathname.endsWith("/")) {
			url.pathname = url.pathname.slice(0, -1);
		}
		if (!url.pathname.endsWith("/translate")) {
			url.pathname += "/translate";
		}
		const res = await fetch(url.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(jsonBody),
			agent: getAgentByUrl,
		});

		const json = (await res.json()) as {
			detectedLanguage?: {
				confidence: number;
				language: string;
			};
			translatedText: string;
		};

		return {
			sourceLang: source ?? json.detectedLanguage?.language,
			text: convertChinese(
				["zh-hant", "zh-TW"].includes(to),
				json.translatedText,
			),
		};
	}

	if (instance.deeplAuthKey == null && instance.libreTranslateApiUrl == null) {
		if (!instance.deeplAuthKey && !instance.libreTranslateApiUrl) {
			const MAX_TRANSLATE = 15000;
			const MAX_TRANSLATE_PER_REQ = 1500;
	
			const toTranslate: string[] = [];
	
			for (
				let i = 0;
				i < text.length && i < MAX_TRANSLATE;
				i += MAX_TRANSLATE_PER_REQ
			) {
				toTranslate.push(text.slice(i, i + MAX_TRANSLATE_PER_REQ));
			}
	
			const googleTranslate = async (toTranslate: string) => {
				const googleUrl = new URL(
					"https://translate.google.com/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto",
				);
				googleUrl.searchParams.append("tl", to.replaceAll("-", "_"));
				googleUrl.searchParams.append("q", toTranslate);
	
				const res = await fetch(googleUrl.toString());
				const json = (await res.json()) as {
					sentences: {
						/** translated text */
						trans: string;
						/** original text */
						orig: string;
					}[];
					src: string;
				};
	
				return {
					sourceLang: json.src,
					text: json.sentences.map((s) => s.trans).join(" "),
				};
			};
	
			const result: {
				sourceLang: string;
				text: string;
			} = {
				sourceLang: source ?? "",
				text: "",
			};
	
			for (const text of toTranslate) {
				// If it is not the first request, sleep 500 milliseconds to prevent 429 too many requests.
				if (!result.text) {
					await new Promise((r) => setTimeout(r, 500));
				}
				try {
					const res = await googleTranslate(text);
					result.sourceLang ||= res.sourceLang;
					result.text += res.text;
				} catch (err) {
					result.text += "... (an error occurred during translate)";
					return result;
				}
			}
	
			if (text.length > MAX_TRANSLATE + MAX_TRANSLATE_PER_REQ) {
				result.text += "... (text is too long to translate)";
			}
	
			return result;
		}
	}

	const deeplTranslator = new deepl.Translator(instance.deeplAuthKey ?? "");
	const result = await deeplTranslator.translateText(
		text,
		source as deepl.SourceLanguageCode | null,
		// DeepL API requires us to specify "en-US" or "en-GB" for English
		// translations ("en" does not work), so we need to address it
		(target === "en" ? to : target) as deepl.TargetLanguageCode,
	);

	return {
		sourceLang: source ?? result.detectedSourceLang,
		text: convertChinese(["zh-hant", "zh-TW"].includes(to), result.text),
	};
}

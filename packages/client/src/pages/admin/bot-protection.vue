<template>
	<div>
		<FormSuspense :p="init">
			<div class="_formRoot">
				<FormRadios v-model="provider" class="_formBlock">
					<option :value="null">
						{{ i18n.ts.none }} ({{ i18n.ts.notRecommended }})
					</option>
					<option value="hcaptcha">hCaptcha</option>
					<option value="recaptcha">reCAPTCHA</option>
				</FormRadios>

				<template v-if="provider === 'hcaptcha'">
					<FormInput v-model="hcaptchaSiteKey" class="_formBlock">
						<template #prefix
							><i :class="icon('ph-key')"></i
						></template>
						<template #label>{{
							i18n.ts.hcaptchaSiteKey
						}}</template>
					</FormInput>
					<FormInput v-model="hcaptchaSecretKey" class="_formBlock">
						<template #prefix
							><i :class="icon('ph-key')"></i
						></template>
						<template #label>{{
							i18n.ts.hcaptchaSecretKey
						}}</template>
					</FormInput>
					<FormSlot class="_formBlock">
						<template #label>{{ i18n.ts.preview }}</template>
						<MkCaptcha
							provider="hcaptcha"
							:sitekey="
								hcaptchaSiteKey ||
								'10000000-ffff-ffff-ffff-000000000001'
							"
						/>
					</FormSlot>
				</template>
				<template v-else-if="provider === 'recaptcha'">
					<FormInput v-model="recaptchaSiteKey" class="_formBlock">
						<template #prefix
							><i :class="icon('ph-key')"></i
						></template>
						<template #label>{{
							i18n.ts.recaptchaSiteKey
						}}</template>
					</FormInput>
					<FormInput v-model="recaptchaSecretKey" class="_formBlock">
						<template #prefix
							><i :class="icon('ph-key')"></i
						></template>
						<template #label>{{
							i18n.ts.recaptchaSecretKey
						}}</template>
					</FormInput>
					<FormSlot v-if="recaptchaSiteKey" class="_formBlock">
						<template #label>{{ i18n.ts.preview }}</template>
						<MkCaptcha
							provider="recaptcha"
							:sitekey="recaptchaSiteKey"
						/>
					</FormSlot>
				</template>

				<FormButton primary @click="save"
					><i :class="icon('ph-floppy-disk-back')"></i>
					{{ i18n.ts.save }}</FormButton
				>
			</div>
		</FormSuspense>
	</div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import FormRadios from "@/components/form/radios.vue";
import FormInput from "@/components/form/input.vue";
import FormButton from "@/components/MkButton.vue";
import FormSuspense from "@/components/form/suspense.vue";
import FormSlot from "@/components/form/slot.vue";
import * as os from "@/os";
import { updateInstanceCache } from "@/instance";
import { i18n } from "@/i18n";
import icon from "@/scripts/icon";

const MkCaptcha = defineAsyncComponent(
	() => import("@/components/MkCaptcha.vue"),
);

const provider = ref<string | null>(null);
const hcaptchaSiteKey = ref<string | null>(null);
const hcaptchaSecretKey = ref<string | null>(null);
const recaptchaSiteKey = ref<string | null>(null);
const recaptchaSecretKey = ref<string | null>(null);

async function init() {
	const meta = await os.api("admin/meta");
	hcaptchaSiteKey.value = meta?.hcaptchaSiteKey;
	hcaptchaSecretKey.value = meta?.hcaptchaSecretKey;
	recaptchaSiteKey.value = meta?.recaptchaSiteKey;
	recaptchaSecretKey.value = meta?.recaptchaSecretKey;

	provider.value = meta?.enableHcaptcha
		? "hcaptcha"
		: meta?.enableRecaptcha
			? "recaptcha"
			: null;
}

function save() {
	os.apiWithDialog("admin/update-meta", {
		enableHcaptcha: provider.value === "hcaptcha",
		hcaptchaSiteKey: hcaptchaSiteKey.value,
		hcaptchaSecretKey: hcaptchaSecretKey.value,
		enableRecaptcha: provider.value === "recaptcha",
		recaptchaSiteKey: recaptchaSiteKey.value,
		recaptchaSecretKey: recaptchaSecretKey.value,
	}).then(() => {
		updateInstanceCache();
	});
}
</script>

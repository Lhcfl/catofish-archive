<template>
	<div class="_formRoot">
		<MkInfo>{{ i18n.ts._instanceMute.title }}</MkInfo>
		<FormTextarea v-model="instanceMutes" class="_formBlock">
			<template #label>{{ i18n.ts._instanceMute.heading }}</template>
			<template #caption
				>{{ i18n.ts._instanceMute.instanceMuteDescription }}<br />{{
					i18n.ts._instanceMute.instanceMuteDescription2
				}}</template
			>
		</FormTextarea>
		<MkButton
			primary
			:disabled="!changed"
			class="_formBlock"
			@click="save()"
			><i :class="icon('ph-floppy-disk-back')"></i>
			{{ i18n.ts.save }}</MkButton
		>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import FormTextarea from "@/components/form/textarea.vue";
import MkInfo from "@/components/MkInfo.vue";
import MkButton from "@/components/MkButton.vue";
import * as os from "@/os";
import { me } from "@/me";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

const instanceMutes = ref(me!.mutedInstances.join("\n"));
const changed = ref(false);

async function save() {
	const mutes = instanceMutes.value
		.trim()
		.split("\n")
		.map((el) => el.trim())
		.filter((el) => el);

	await os.api("i/update", {
		mutedInstances: mutes,
	});

	changed.value = false;

	// Refresh filtered list to signal to the user how they've been saved
	instanceMutes.value = mutes.join("\n");
}

watch(instanceMutes, () => {
	changed.value = true;
});

definePageMetadata({
	title: i18n.ts.instanceMute,
	icon: `${icon("ph-speaker-none ph-dir")}`,
});
</script>

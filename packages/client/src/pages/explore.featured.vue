<template>
	<MkSpacer :content-max="800">
		<MkTab v-model="tab" style="margin-block-end: var(--margin)">
			<option value="local">{{ i18n.ts.local }}</option>
			<option value="remote">{{ i18n.ts.remote }}</option>
		</MkTab>
		<XNotes v-if="tab === 'local'" :pagination="paginationForLocal" />
		<XNotes
			v-else-if="tab === 'remote'"
			:pagination="paginationForRemote"
		/>
	</MkSpacer>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import XNotes from "@/components/MkNotes.vue";
import MkTab from "@/components/MkTab.vue";
import { i18n } from "@/i18n";

const paginationForLocal = {
	endpoint: "notes/featured" as const,
	limit: 15,
	origin: "local",
	offsetMode: true,
	params: {
		days: 5,
	},
};

const paginationForRemote = {
	endpoint: "notes/featured" as const,
	limit: 15,
	offsetMode: true,
	params: {
		origin: "remote",
		days: 5,
	},
};

const tab = ref("local");
</script>

<template>
	<XColumn
		:menu="menu"
		:column="column"
		:is-stacked="isStacked"
		@parent-focus="($event) => emit('parent-focus', $event)"
	>
		<template #header>
			<i :class="icon('ph-list-bullets ph-dir')"></i
			><span style="margin-inline-start: 8px">{{ column.name }}</span>
		</template>

		<XTimeline
			v-if="column.listId"
			ref="timeline"
			src="list"
			:list="column.listId"
			@after="() => emit('loaded')"
		/>
	</XColumn>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import XColumn from "./column.vue";
import type { Column } from "./deck-store";
import { updateColumn } from "./deck-store";
import XTimeline from "@/components/MkTimeline.vue";
import * as os from "@/os";
import { i18n } from "@/i18n";
import icon from "@/scripts/icon";

const props = defineProps<{
	column: Column;
	isStacked: boolean;
}>();

const emit = defineEmits<{
	(ev: "loaded"): void;
	(ev: "parent-focus", direction: "up" | "down" | "left" | "right"): void;
}>();

const timeline = ref<InstanceType<typeof XTimeline>>();

if (props.column.listId == null) {
	setList();
}

async function setList() {
	const lists = await os.api("users/lists/list");
	const { canceled, result: list } = await os.select({
		title: i18n.ts.selectList,
		items: lists.map((x) => ({
			value: x,
			text: x.name,
		})),
		default: props.column.listId,
	});
	if (canceled) return;
	updateColumn(props.column.id, {
		name: list.name,
		listId: list.id,
	});
}

const menu = [
	{
		icon: `${icon("ph-pencil")}`,
		text: i18n.ts.selectList,
		action: setList,
	},
];
</script>

<style lang="scss" scoped></style>

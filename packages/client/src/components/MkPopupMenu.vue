<template>
	<MkModal
		ref="modal"
		v-slot="{ type, maxHeight }"
		:z-priority="'high'"
		:src="src"
		:transparent-bg="true"
		:anchor
		tabindex="-1"
		@click="modal?.close()"
		@closed="emit('closed')"
	>
		<MkMenu
			:items="items"
			:align="align"
			:width="width"
			:max-height="maxHeight"
			:as-drawer="type === 'drawer'"
			class="sfhdhdhq"
			:class="{ drawer: type === 'drawer' }"
			:no-return-focus="noReturnFocus"
			@close="modal?.close()"
		/>
	</MkModal>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import MkModal from "./MkModal.vue";
import MkMenu from "./MkMenu.vue";
import type { MenuItem } from "@/types/menu";

defineProps<{
	items: MenuItem[];
	align?: "center" | string;
	width?: number;
	viaKeyboard?: boolean;
	src?: HTMLElement | null;
	anchor?: {
		x: "left" | "center" | "right";
		y: "top" | "center" | "bottom";
	};
	noReturnFocus?;
}>();

const emit = defineEmits<{
	(ev: "closed"): void;
}>();

const modal = ref<InstanceType<typeof MkModal>>();
</script>

<style lang="scss" scoped>
.sfhdhdhq {
	&.drawer {
		border-radius: 24px;
		border-end-end-radius: 0;
		border-end-start-radius: 0;
	}
}
</style>

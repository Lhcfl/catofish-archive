<template>
	<div
		v-if="
			hasDisconnected &&
			defaultStore.state.serverDisconnectedBehavior === 'quiet'
		"
		class="nsbbhtug"
		@click="resetDisconnected"
	>
		<div>{{ i18n.ts.disconnectedFromServer }}</div>
		<div class="command">
			<button class="_textButton" @click="reload">
				{{ i18n.ts.reload }}
			</button>
			<button class="_textButton">{{ i18n.ts.doNothing }}</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from "vue";
import { isReloading, useStream } from "@/stream";
import { i18n } from "@/i18n";
import { defaultStore } from "@/store";

const hasDisconnected = ref(false);

function onDisconnected() {
	if (isReloading) return;
	hasDisconnected.value = true;
}

function resetDisconnected() {
	hasDisconnected.value = false;
}

function reload() {
	location.reload();
}

const stream = useStream();
stream.on("_disconnected_", onDisconnected);

onUnmounted(() => {
	stream.off("_disconnected_", onDisconnected);
});
</script>

<style lang="scss" scoped>
.nsbbhtug {
	position: fixed;
	z-index: 16385;
	inset-block-end: 8px;
	inset-inline-end: 8px;
	margin: 0;
	padding-block: 6px;
	padding-inline: 12px;
	font-size: 0.9em;
	color: #fff;
	background: #000;
	opacity: 0.8;
	border-radius: 4px;
	max-inline-size: 320px;

	> .command {
		display: flex;
		justify-content: space-around;

		> button {
			padding: 0.7em;
		}
	}
}
</style>

<template>
	<div ref="rootEl" class="meijqfqm">
		<canvas
			:id="idForCanvas"
			ref="canvasEl"
			class="canvas"
			:width="width"
			height="300"
			@contextmenu.prevent="() => {}"
		></canvas>
		<div :id="idForTags" ref="tagsEl" class="tags">
			<ul>
				<slot></slot>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import tinycolor from "tinycolor2";

const loaded = !!window.TagCanvas;
const SAFE_FOR_HTML_ID = "abcdefghijklmnopqrstuvwxyz";
const computedStyle = getComputedStyle(document.documentElement);
const idForCanvas = Array.from(Array(16))
	.map(
		() => SAFE_FOR_HTML_ID[Math.floor(Math.random() * SAFE_FOR_HTML_ID.length)],
	)
	.join("");
const idForTags = Array.from(Array(16))
	.map(
		() => SAFE_FOR_HTML_ID[Math.floor(Math.random() * SAFE_FOR_HTML_ID.length)],
	)
	.join("");
const available = ref(false);
const rootEl = ref<HTMLElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);
const tagsEl = ref<HTMLElement | null>(null);
const width = ref(300);

watch(available, () => {
	try {
		window.TagCanvas.Start(idForCanvas, idForTags, {
			textColour: "#ffffff",
			outlineColour: tinycolor(
				computedStyle.getPropertyValue("--accent"),
			).toHexString(),
			outlineRadius: 10,
			initial: [-0.03, -0.01],
			frontSelect: true,
			imageRadius: 8,
			// dragControl: true,
			dragThreshold: 3,
			wheelZoom: false,
			reverse: true,
			depth: 0.5,
			maxSpeed: 0.2,
			minSpeed: 0.003,
			stretchX: 0.8,
			stretchY: 0.8,
		});
	} catch (err) {}
});

onMounted(() => {
	width.value = rootEl.value.offsetWidth;

	if (loaded) {
		available.value = true;
	} else {
		document.head
			.appendChild(
				Object.assign(document.createElement("script"), {
					async: true,
					src: "/client-assets/tagcanvas.min.js",
				}),
			)
			// biome-ignore lint/suspicious/noAssignInExpressions: assign it intentially
			.addEventListener("load", () => (available.value = true));
	}
});

onBeforeUnmount(() => {
	if (window.TagCanvas) window.TagCanvas.Delete(idForCanvas);
});

defineExpose({
	update: () => {
		window.TagCanvas.Update(idForCanvas);
	},
});
</script>

<style lang="scss" scoped>
.meijqfqm {
	position: relative;
	overflow: clip;
	display: grid;
	place-items: center;

	> .canvas {
		display: block;
	}

	> .tags {
		position: absolute;
		inset-block-start: 999px;
		inset-inline-start: 999px;
	}
}
</style>

<template>
	<div ref="el" class="fdidabkc" :style="{ background: bg }" @click="onClick">
		<template v-if="metadata">
			<div class="titleContainer" @click="showTabsPopup">
				<i
					v-if="metadata.icon"
					class="icon"
					:class="icon(metadata.icon)"
				></i>

				<div class="title">
					<div class="title">{{ metadata.title }}</div>
				</div>
			</div>
			<div class="tabs">
				<button
					v-for="tab in tabs"
					:ref="(el) => (tabRefs[tab.key] = el)"
					v-tooltip.noDelay="tab.title"
					class="tab _button"
					:class="{
						active: tab.key != null && tab.key === props.tab,
					}"
					@mousedown="(ev) => onTabMousedown(tab, ev)"
					@click="(ev) => onTabClick(tab, ev)"
				>
					<i v-if="tab.icon" class="icon" :class="tab.icon"></i>
					<span v-if="!tab.iconOnly" class="title">{{
						tab.title
					}}</span>
				</button>
				<div ref="tabHighlightEl" class="highlight"></div>
			</div>
		</template>
		<div class="buttons right">
			<template v-if="actions">
				<template v-for="action in actions">
					<MkButton
						v-if="action.asFullButton"
						class="fullButton"
						primary
						@click.stop="action.handler"
						><i :class="action.icon" style="margin-inline-end: 6px"></i
						>{{ action.text }}</MkButton
					>
					<button
						v-else
						v-tooltip.noDelay="action.text"
						class="_button button"
						:class="{ highlighted: action.highlighted }"
						@click.stop="action.handler"
						@touchstart="preventDrag"
					>
						<i :class="action.icon"></i>
					</button>
				</template>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import tinycolor from "tinycolor2";
import { popupMenu } from "@/os";
import { scrollToTop } from "@/scripts/scroll";
import MkButton from "@/components/MkButton.vue";
import { globalEvents } from "@/events";
import { injectPageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

interface Tab {
	key?: string | null;
	title: string;
	icon?: string;
	iconOnly?: boolean;
	onClick?: (ev: MouseEvent) => void;
}

const props = defineProps<{
	tabs?: Tab[];
	tab?: string;
	actions?: {
		text: string;
		icon: string;
		asFullButton?: boolean;
		handler: (ev: MouseEvent) => void;
	}[];
	thin?: boolean;
}>();

const emit = defineEmits<{
	(ev: "update:tab", key: string);
}>();

const metadata = injectPageMetadata();

const el = ref<HTMLElement>();
const tabRefs = {};
const tabHighlightEl = ref<HTMLElement | null>(null);
const bg = ref<string>();
const hasTabs = computed(() => {
	return props.tabs && props.tabs.length > 0;
});

const showTabsPopup = (ev: MouseEvent) => {
	if (!hasTabs.value) return;
	ev.preventDefault();
	ev.stopPropagation();
	const menu = props.tabs.map((tab) => ({
		text: tab.title,
		icon: tab.icon,
		active: tab.key != null && tab.key === props.tab,
		action: (ev) => {
			onTabClick(tab, ev);
		},
	}));
	popupMenu(menu, ev.currentTarget ?? ev.target);
};

const preventDrag = (ev: TouchEvent) => {
	ev.stopPropagation();
};

const onClick = () => {
	scrollToTop(el.value, { behavior: "smooth" });
};

function onTabMousedown(tab: Tab, ev: MouseEvent): void {
	// ユーザビリティの観点からmousedown時にはonClickは呼ばない
	if (tab.key) {
		emit("update:tab", tab.key);
	}
}

function onTabClick(tab: Tab, ev: MouseEvent): void {
	if (tab.onClick) {
		ev.preventDefault();
		ev.stopPropagation();
		tab.onClick(ev);
	}
	if (tab.key) {
		emit("update:tab", tab.key);
	}
}

const calcBg = () => {
	const rawBg = metadata?.bg || "var(--bg)";
	const tinyBg = tinycolor(
		rawBg.startsWith("var(")
			? getComputedStyle(document.documentElement).getPropertyValue(
					rawBg.slice(4, -1),
				)
			: rawBg,
	);
	tinyBg.setAlpha(0.85);
	bg.value = tinyBg.toRgbString();
};

onMounted(() => {
	calcBg();
	globalEvents.on("themeChanged", calcBg);

	watch(
		() => [props.tab, props.tabs],
		() => {
			nextTick(() => {
				const tabEl = tabRefs[props.tab];
				if (tabEl && tabHighlightEl.value) {
					// offsetWidth や offsetLeft は少数を丸めてしまうため getBoundingClientRect を使う必要がある
					// https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/offsetWidth#%E5%80%A4
					const parentRect = tabEl.parentElement.getBoundingClientRect();
					const rect = tabEl.getBoundingClientRect();
					var inlineSize = rect.width;
					var insetInlineStart = rect.left - parentRect.left;
					const isVertical = getComputedStyle(tabHighlightEl.value)[
						"writing-mode"
					].startsWith("vertical");
					if (isVertical) {
						inlineSize = rect.height;
					}
					if (getComputedStyle(tabHighlightEl.value).direction === "rtl") {
						if (isVertical) {
							tabHighlightEl.value.style.insetBlockEnd =
								rect.bottom - parentRect.bottom + "px";
						} else {
							tabHighlightEl.value.style.insetInlineEnd =
								rect.right - parentRect.right + "px";
						}
					} else {
						if (isVertical) {
							tabHighlightEl.value.style.insetBlockStart =
								rect.top - parentRect.top + "px";
						}
					}
					tabHighlightEl.value.style.inlineSize = inlineSize + "px";
					tabHighlightEl.value.style.insetInlineStart = insetInlineStart + "px";
				}
			});
		},
		{
			immediate: true,
		},
	);
});

onUnmounted(() => {
	globalEvents.off("themeChanged", calcBg);
});
</script>

<style lang="scss" scoped>
.fdidabkc {
	--height: 60px;
	display: flex;
	inline-size: 100%;
	-webkit-backdrop-filter: var(--blur, blur(15px));
	backdrop-filter: var(--blur, blur(15px));

	> .buttons {
		--margin: 8px;
		display: flex;
		align-items: center;
		block-size: var(--height);
		margin-block: 0;
		margin-inline: var(--margin);

		&.right {
			margin-inline-start: auto;
		}

		&:empty {
			inline-size: var(--height);
		}

		> .button {
			display: flex;
			align-items: center;
			justify-content: center;
			block-size: calc(var(--height) - (var(--margin) * 2));
			inline-size: calc(var(--height) - (var(--margin) * 2));
			box-sizing: border-box;
			position: relative;
			border-radius: 5px;

			&:hover {
				background: rgba(0, 0, 0, 0.05);
			}

			&.highlighted {
				color: var(--accent);
			}
		}

		> .fullButton {
			& + .fullButton {
				margin-inline-start: 12px;
			}
		}
	}

	> .titleContainer {
		display: flex;
		align-items: center;
		max-inline-size: 400px;
		overflow: auto;
		white-space: nowrap;
		text-align: start;
		font-weight: bold;
		flex-shrink: 0;
		margin-inline-start: 24px;

		> .avatar {
			$size: 32px;
			display: inline-block;
			inline-size: $size;
			block-size: $size;
			vertical-align: bottom;
			margin-block: 0;
			margin-inline: 8px;
			pointer-events: none;
		}

		> .icon {
			margin-inline-end: 8px;
			inline-size: 16px;
			text-align: center;
		}

		> .title {
			min-inline-size: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			line-height: 1.1;

			> .subtitle {
				opacity: 0.6;
				font-size: 0.8em;
				font-weight: normal;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;

				&.activeTab {
					text-align: center;

					> .chevron {
						display: inline-block;
						margin-inline-start: 6px;
					}
				}
			}
		}
	}

	> .tabs {
		position: relative;
		margin-inline-start: 16px;
		font-size: 0.8em;
		overflow: auto;
		white-space: nowrap;

		> .tab {
			display: inline-block;
			position: relative;
			padding-block: 0;
			padding-inline: 10px;
			block-size: 100%;
			font-weight: normal;
			opacity: 0.7;

			&:hover,
			&:focus-visible,
			&.active {
				opacity: 1;
			}

			> .icon + .title {
				margin-inline-start: 8px;
			}
		}

		> .highlight {
			position: absolute;
			inset-block-end: 0;
			block-size: 3px;
			background: var(--accent);
			border-radius: 999px;
			transition: all 0.2s ease;
			pointer-events: none;
		}
	}
}
</style>

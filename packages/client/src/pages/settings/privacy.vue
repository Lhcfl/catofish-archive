<template>
	<div class="_formRoot">
		<FormSwitch
			v-model="isLocked"
			class="_formBlock"
			@update:modelValue="save()"
			>{{ i18n.ts.makeFollowManuallyApprove
			}}<template #caption>{{
				i18n.ts.lockedAccountInfo
			}}</template></FormSwitch
		>
		<FormSwitch
			v-if="isLocked"
			v-model="autoAcceptFollowed"
			class="_formBlock"
			@update:modelValue="save()"
			>{{ i18n.ts.autoAcceptFollowed }}</FormSwitch
		>

		<FormSwitch
			v-model="publicReactions"
			class="_formBlock"
			@update:modelValue="save()"
		>
			{{ i18n.ts.makeReactionsPublic }}
			<template #caption>{{
				i18n.ts.makeReactionsPublicDescription
			}}</template>
		</FormSwitch>

		<FormSelect
			v-model="ffVisibility"
			class="_formBlock"
			@update:modelValue="save()"
		>
			<template #label>{{ i18n.ts.ffVisibility }}</template>
			<option value="public">{{ i18n.ts._ffVisibility.public }}</option>
			<option value="followers">
				{{ i18n.ts._ffVisibility.followers }}
			</option>
			<option value="private">{{ i18n.ts._ffVisibility.private }}</option>
			<template #caption>{{ i18n.ts.ffVisibilityDescription }}</template>
		</FormSelect>

		<FormSwitch
			v-model="hideOnlineStatus"
			class="_formBlock"
			@update:modelValue="save()"
		>
			{{ i18n.ts.hideOnlineStatus }}
			<template #caption>{{
				i18n.ts.hideOnlineStatusDescription
			}}</template>
		</FormSwitch>
		<FormSwitch
			v-model="isIndexable"
			class="_formBlock"
			@update:modelValue="save()"
		>
			{{ i18n.ts.indexable }}
			<template #caption>{{ i18n.ts.indexableDescription }}</template>
		</FormSwitch>
		<FormSwitch
			v-model="noCrawle"
			class="_formBlock"
			@update:modelValue="save()"
		>
			{{ i18n.ts.noCrawle }}
			<template #caption>{{ i18n.ts.noCrawleDescription }}</template>
		</FormSwitch>
		<FormSwitch v-model="preventAiLearning" @update:model-value="save()">
			{{ i18n.ts.preventAiLearning
			}}<span class="_beta">{{ i18n.ts.beta }}</span>
			<template #caption>{{
				i18n.ts.preventAiLearningDescription
			}}</template>
		</FormSwitch>
		<FormSwitch
			v-model="isExplorable"
			class="_formBlock"
			@update:modelValue="save()"
		>
			{{ i18n.ts.makeExplorable }}
			<template #caption>{{
				i18n.ts.makeExplorableDescription
			}}</template>
		</FormSwitch>

		<FormSection>
			<FormSwitch
				v-model="rememberNoteVisibility"
				class="_formBlock"
				@update:modelValue="save()"
				>{{ i18n.ts.rememberNoteVisibility }}</FormSwitch
			>
			<FormFolder v-if="!rememberNoteVisibility" class="_formBlock">
				<template #label>{{ i18n.ts.defaultNoteVisibility }}</template>
				<template v-if="defaultNoteVisibility === 'public'" #suffix>{{
					i18n.ts._visibility.public
				}}</template>
				<template
					v-else-if="defaultNoteVisibility === 'home'"
					#suffix
					>{{ i18n.ts._visibility.home }}</template
				>
				<template
					v-else-if="defaultNoteVisibility === 'followers'"
					#suffix
					>{{ i18n.ts._visibility.followers }}</template
				>
				<template
					v-else-if="defaultNoteVisibility === 'specified'"
					#suffix
					>{{ i18n.ts._visibility.specified }}</template
				>
				<template
					v-else-if="defaultNoteVisibility === 'private'"
					#suffix
					>{{ i18n.ts.private }}</template
				>

				<FormSelect v-model="defaultNoteVisibility" class="_formBlock">
					<option value="public">
						{{ i18n.ts._visibility.public }}
					</option>
					<option value="home">{{ i18n.ts._visibility.home }}</option>
					<option value="followers">
						{{ i18n.ts._visibility.followers }}
					</option>
					<option value="specified">
						{{ i18n.ts._visibility.specified }}
					</option>
					<option value="private">
						{{ i18n.ts.private }}
					</option>
				</FormSelect>
				<FormSwitch v-model="defaultNoteLocalOnly" class="_formBlock">{{
					i18n.ts._visibility.localOnly
				}}</FormSwitch>
			</FormFolder>
		</FormSection>

		<FormSwitch
			v-model="keepCw"
			class="_formBlock"
			@update:modelValue="save()"
			>{{ i18n.ts.keepCw }}</FormSwitch
		>
		<FormSwitch
			v-model="addRe"
			class="_formBlock"
			@update:modelValue="save()"
			>{{ i18n.ts.addRe }}
		</FormSwitch>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import FormSwitch from "@/components/form/switch.vue";
import FormSelect from "@/components/form/select.vue";
import FormSection from "@/components/form/section.vue";
import FormFolder from "@/components/form/folder.vue";
import * as os from "@/os";
import { defaultStore } from "@/store";
import { i18n } from "@/i18n";
import { me } from "@/me";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

const isLocked = ref(me.isLocked);
const autoAcceptFollowed = ref(me.autoAcceptFollowed);
const noCrawle = ref(me.noCrawle);
const isIndexable = ref(me.isIndexable);
const isExplorable = ref(me.isExplorable);
const hideOnlineStatus = ref(me.hideOnlineStatus);
const publicReactions = ref(me.publicReactions);
const ffVisibility = ref(me.ffVisibility);
const preventAiLearning = ref(me.preventAiLearning);

const defaultNoteVisibility = computed(
	defaultStore.makeGetterSetter("defaultNoteVisibility"),
);
const defaultNoteLocalOnly = computed(
	defaultStore.makeGetterSetter("defaultNoteLocalOnly"),
);
const rememberNoteVisibility = computed(
	defaultStore.makeGetterSetter("rememberNoteVisibility"),
);
const keepCw = computed(defaultStore.makeGetterSetter("keepCw"));
const addRe = computed(defaultStore.makeGetterSetter("addRe"));

function save() {
	os.api("i/update", {
		isLocked: !!isLocked.value,
		autoAcceptFollowed: !!autoAcceptFollowed.value,
		noCrawle: !!noCrawle.value,
		isIndexable: !!isIndexable.value,
		isExplorable: !!isExplorable.value,
		hideOnlineStatus: !!hideOnlineStatus.value,
		publicReactions: !!publicReactions.value,
		preventAiLearning: !!preventAiLearning.value,
		ffVisibility: ffVisibility.value,
	});
}

definePageMetadata({
	title: i18n.ts.privacy,
	icon: `${icon("ph-keyhole")}`,
});
</script>

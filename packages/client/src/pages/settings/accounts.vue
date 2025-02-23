<template>
	<div class="_formRoot">
		<FormSuspense :p="init">
			<FormButton primary @click="addAccount"
				><i :class="icon('ph-plus')"></i>
				{{ i18n.ts.addAccount }}</FormButton
			>

			<button
				v-for="account in accounts"
				:key="account.id"
				class="_panel _button lcjjdxlm"
				@click="menu(account, $event)"
			>
				<div class="avatar">
					<MkAvatar :user="account" class="avatar" disable-link />
				</div>
				<div class="body">
					<div class="name">
						<MkUserName :user="account" />
					</div>
					<div class="acct">
						<MkAcct :user="account" />
					</div>
				</div>
			</button>
		</FormSuspense>
	</div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from "vue";
import FormSuspense from "@/components/form/suspense.vue";
import FormButton from "@/components/MkButton.vue";
import * as os from "@/os";
import {
	removeAccount as _removeAccount,
	addAccount as addAccounts,
	getAccounts,
	signIn,
} from "@/account";
import { me } from "@/me";
import { i18n } from "@/i18n";
import { definePageMetadata } from "@/scripts/page-metadata";
import icon from "@/scripts/icon";

const storedAccounts = ref<any>(null);
const accounts = ref<any>(null);

const init = async () => {
	getAccounts()
		.then((accounts) => {
			storedAccounts.value = accounts.filter((x) => x.id !== me!.id);

			console.log(storedAccounts.value);

			return os.api("users/show", {
				userIds: storedAccounts.value.map((x) => x.id),
			});
		})
		.then((response) => {
			accounts.value = response;
			console.log(accounts.value);
		});
};

function menu(account, ev) {
	os.popupMenu(
		[
			{
				text: i18n.ts.switch,
				icon: `${icon("ph-swap")}`,
				action: () => switchAccount(account),
			},
			{
				text: i18n.ts.remove,
				icon: `${icon("ph-trash")}`,
				danger: true,
				action: () => removeAccount(account),
			},
		],
		ev.currentTarget ?? ev.target,
	);
}

function addAccount(ev) {
	os.popupMenu(
		[
			{
				text: i18n.ts.existingAccount,
				action: () => {
					addExistingAccount();
				},
			},
			{
				text: i18n.ts.createAccount,
				action: () => {
					createAccount();
				},
			},
		],
		ev.currentTarget ?? ev.target,
	);
}

function removeAccount(account) {
	_removeAccount(account.id);
}

function addExistingAccount() {
	os.popup(
		defineAsyncComponent(() => import("@/components/MkSigninDialog.vue")),
		{},
		{
			done: (res) => {
				addAccounts(res.id, res.i);
				os.success();
			},
		},
		"closed",
	);
}

function createAccount() {
	os.popup(
		defineAsyncComponent(() => import("@/components/MkSignupDialog.vue")),
		{},
		{
			done: (res) => {
				addAccounts(res.id, res.i);
				switchAccountWithToken(res.i);
			},
		},
		"closed",
	);
}

async function switchAccount(account: any) {
	const fetchedAccounts: any[] = await getAccounts();
	const token = fetchedAccounts.find((x) => x.id === account.id).token;
	switchAccountWithToken(token);
}

function switchAccountWithToken(token: string) {
	signIn(token);
}

definePageMetadata({
	title: i18n.ts.accounts,
	icon: `${icon("ph-users")}`,
});
</script>

<style lang="scss" scoped>
.lcjjdxlm {
	display: flex;
	padding: 16px;
	inline-size: 100%;
	text-align: unset;

	> .avatar {
		display: block;
		flex-shrink: 0;
		margin-block-start: 0;
		margin-inline-end: 12px;
		margin-block-end: 0;
		margin-inline-start: 0;

		> .avatar {
			inline-size: 50px;
			block-size: 50px;
		}
	}

	> .body {
		display: flex;
		flex-direction: column;
		justify-content: center;
		inline-size: calc(100% - 62px);
		position: relative;

		> .name {
			font-weight: bold;
		}
	}
}
</style>

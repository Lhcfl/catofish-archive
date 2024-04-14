import type { MigrationInterface, QueryRunner } from "typeorm";

export class chartV61643967331284 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___incomingRequests" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___outgoingRequests" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___totalTime" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___incomingBytes" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___outgoingBytes" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___incomingRequests" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___outgoingRequests" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___totalTime" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___incomingBytes" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___outgoingBytes" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_failed" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_succeeded" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_received" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_totalFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_incFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_decFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_incUsage" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_decUsage" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_failed" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_succeeded" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_received" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_totalFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_incFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_decFiles" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_incUsage" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_decUsage" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_normal" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_reply" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_renote" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_decSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_decSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_decSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_decSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_reaction" ALTER COLUMN "___local_count" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_reaction" ALTER COLUMN "___remote_count" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_reaction" ALTER COLUMN "___local_count" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_reaction" ALTER COLUMN "___remote_count" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_total" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_inc" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_dec" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___totalCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___totalSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___decSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___totalCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___totalSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___incCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___incSize" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___decCount" SET DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___decSize" SET DEFAULT '0'`,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___totalSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_drive" ALTER COLUMN "___totalCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___totalSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_drive" ALTER COLUMN "___totalCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___remote_followings_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_following" ALTER COLUMN "___local_followings_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___remote_followings_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_following" ALTER COLUMN "___local_followings_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_reaction" ALTER COLUMN "___remote_count" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_reaction" ALTER COLUMN "___local_count" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_reaction" ALTER COLUMN "___remote_count" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_reaction" ALTER COLUMN "___local_count" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___remote_incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__drive" ALTER COLUMN "___local_incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___remote_incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_decSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_decCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_incSize" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__drive" ALTER COLUMN "___local_incCount" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__per_user_notes" ALTER COLUMN "___total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__per_user_notes" ALTER COLUMN "___total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_decUsage" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_incUsage" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_decFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_incFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___drive_totalFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___following_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___users_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___notes_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_received" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_succeeded" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__instance" ALTER COLUMN "___requests_failed" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_decUsage" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_incUsage" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_decFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_incFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___drive_totalFiles" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___followers_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___following_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___users_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___notes_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_received" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_succeeded" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__instance" ALTER COLUMN "___requests_failed" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___outgoingBytes" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___incomingBytes" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___totalTime" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___outgoingRequests" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__network" ALTER COLUMN "___incomingRequests" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___outgoingBytes" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___incomingBytes" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___totalTime" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___outgoingRequests" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__network" ALTER COLUMN "___incomingRequests" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___remote_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__users" ALTER COLUMN "___local_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___remote_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__users" ALTER COLUMN "___local_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___remote_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__notes" ALTER COLUMN "___local_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___remote_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_renote" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_reply" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_diffs_normal" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__notes" ALTER COLUMN "___local_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart_day__federation" ALTER COLUMN "___instance_total" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_dec" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_inc" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "__chart__federation" ALTER COLUMN "___instance_total" DROP DEFAULT`,
		);
	}
}

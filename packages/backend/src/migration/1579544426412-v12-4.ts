import type { MigrationInterface, QueryRunner } from "typeorm";

export class v1241579544426412 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notification" ADD "followRequestId" character varying(32)`,
			undefined,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" ADD CONSTRAINT "FK_bd7fab507621e635b32cd31892c" FOREIGN KEY ("followRequestId") REFERENCES "follow_request"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
			undefined,
		);
	}
	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "notification" DROP CONSTRAINT "FK_bd7fab507621e635b32cd31892c"`,
			undefined,
		);
		await queryRunner.query(
			`ALTER TABLE "notification" DROP COLUMN "followRequestId"`,
			undefined,
		);
	}
}

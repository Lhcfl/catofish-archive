import * as mfm from "mfm-js";
import sanitizeHtml from "sanitize-html";
import { AbuseUserReports, UserProfiles, Users } from "@/models/index.js";
import { genIdAt, publishToModerationStream } from "backend-rs";
import { sendEmail } from "@/services/send-email.js";
import { getUser } from "@/server/api/common/getters.js";
import { ApiError } from "@/server/api/error.js";
import define from "@/server/api/define.js";
import { toHtml } from "@/mfm/to-html.js";

export const meta = {
	tags: ["users"],

	requireCredential: true,

	description: "File a report.",

	errors: {
		noSuchUser: {
			message: "No such user.",
			code: "NO_SUCH_USER",
			id: "1acefcb5-0959-43fd-9685-b48305736cb5",
		},

		cannotReportYourself: {
			message: "Cannot report yourself.",
			code: "CANNOT_REPORT_YOURSELF",
			id: "1e13149e-b1e8-43cf-902e-c01dbfcb202f",
		},

		cannotReportAdmin: {
			message: "Cannot report the admin.",
			code: "CANNOT_REPORT_THE_ADMIN",
			id: "35e166f5-05fb-4f87-a2d5-adb42676d48f",
		},
	},
} as const;

export const paramDef = {
	type: "object",
	properties: {
		userId: { type: "string", format: "misskey:id" },
		comment: { type: "string", minLength: 1, maxLength: 2048 },
	},
	required: ["userId", "comment"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	// Lookup user
	const user = await getUser(ps.userId).catch((e) => {
		if (e.id === "15348ddd-432d-49c2-8a5a-8069753becff")
			throw new ApiError(meta.errors.noSuchUser);
		throw e;
	});

	if (user.id === me.id) {
		throw new ApiError(meta.errors.cannotReportYourself);
	}

	if (user.isAdmin) {
		throw new ApiError(meta.errors.cannotReportAdmin);
	}

	const now = new Date();

	const report = await AbuseUserReports.insert({
		id: genIdAt(now),
		createdAt: now,
		targetUserId: user.id,
		targetUserHost: user.host,
		reporterId: me.id,
		reporterHost: null,
		comment: ps.comment,
	}).then((x) => AbuseUserReports.findOneByOrFail(x.identifiers[0]));

	// Publish event to moderators
	setImmediate(async () => {
		const moderators = await Users.find({
			where: [
				{
					isAdmin: true,
				},
				{
					isModerator: true,
				},
			],
		});

		for await (const moderator of moderators) {
			await publishToModerationStream(moderator.id, {
				id: report.id,
				targetUserId: report.targetUserId,
				reporterId: report.reporterId,
				comment: report.comment,
			});

			const profile = await UserProfiles.findOneBy({ userId: moderator.id });
			if (profile?.email) {
				sendEmail(
					profile.email,
					"New abuse report",
					sanitizeHtml(toHtml(mfm.parse(ps.comment))!),
					sanitizeHtml(toHtml(mfm.parse(ps.comment))!),
				);
			}
		}
	});
});

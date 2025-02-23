import define from "@/server/api/define.js";
import { Users } from "@/models/index.js";
import { insertModerationLog } from "@/services/insert-moderation-log.js";
import { InternalEvent, publishToInternalStream } from "backend-rs";

export const meta = {
	tags: ["admin"],

	requireCredential: true,
	requireModerator: true,
} as const;

export const paramDef = {
	type: "object",
	properties: {
		userId: { type: "string", format: "misskey:id" },
	},
	required: ["userId"],
} as const;

export default define(meta, paramDef, async (ps, me) => {
	const user = await Users.findOneBy({ id: ps.userId });

	if (user == null) {
		throw new Error("user not found");
	}

	await Users.update(user.id, {
		isSilenced: false,
	});

	publishToInternalStream(InternalEvent.Silence, {
		id: user.id,
		isSilenced: false,
	});

	insertModerationLog(me, "unsilence", {
		targetId: user.id,
	});
});

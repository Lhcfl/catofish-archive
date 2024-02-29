import Channel from "../channel.js";
import { UserListJoinings, UserLists } from "@/models/index.js";
import type { User } from "@/models/entities/user.js";
import { isUserRelated } from "@/misc/is-user-related.js";
import type { Packed } from "@/misc/schema.js";

export default class extends Channel {
	public readonly chName = "userList";
	public static shouldShare = false;
	public static requireCredential = false;
	private listId: string;
	public listUsers: User["id"][] = [];
	private listUsersClock: NodeJS.Timer;

	constructor(id: string, connection: Channel["connection"]) {
		super(id, connection);
		this.updateListUsers = this.updateListUsers.bind(this);
		this.onNote = this.withPackedNote(this.onNote.bind(this));
	}

	public async init(params: any) {
		this.listId = params.listId as string;

		// Check existence and owner
		const exist = await UserLists.exist({
			where: {
				id: this.listId,
				userId: this.user!.id,
			},
		});
		if (!exist) return;

		// Subscribe stream
		this.subscriber.on(`userListStream:${this.listId}`, this.send);

		this.subscriber.on("notesStream", this.onNote);

		this.updateListUsers();
		this.listUsersClock = setInterval(this.updateListUsers, 5000);
	}

	private async updateListUsers() {
		const users = await UserListJoinings.find({
			where: {
				userListId: this.listId,
			},
			select: ["userId"],
		});

		this.listUsers = users.map((x) => x.userId);
	}

	private async onNote(note: Packed<"Note">) {
		if (note.visibility === "hidden") return;
		if (!this.listUsers.includes(note.userId)) return;

		// 流れてきたNoteがミュートしているユーザーが関わるものだったら無視する
		if (isUserRelated(note, this.muting)) return;
		// 流れてきたNoteがブロックされているユーザーが関わるものだったら無視する
		if (isUserRelated(note, this.blocking)) return;

		if (note.renote && !note.text && this.renoteMuting.has(note.userId)) return;
		if (note.replyId != null && this.replyMuting.has(note.userId)) return;

		this.send("note", note);
	}

	public dispose() {
		// Unsubscribe events
		this.subscriber.off(`userListStream:${this.listId}`, this.send);
		this.subscriber.off("notesStream", this.onNote);

		clearInterval(this.listUsersClock);
	}
}

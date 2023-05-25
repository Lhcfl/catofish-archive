import {Health, MeiliSearch, Stats } from 'meilisearch';
import { dbLogger } from "./logger.js";

import config from "@/config/index.js";
import {Note} from "@/models/entities/note.js";

const logger = dbLogger.createSubLogger("meilisearch", "gray", false);

logger.info("Connecting to MeiliSearch");

const hasConfig =
	config.meilisearch && (config.meilisearch.host || config.meilisearch.port || config.meilisearch.apiKey);

const host = hasConfig ? config.meilisearch.host ?? "localhost" : "";
const port = hasConfig ? config.meilisearch.port ?? 7700 : 0;
const auth = hasConfig ? config.meilisearch.apiKey ?? "" : "";

const client: MeiliSearch = new MeiliSearch({
	host: `http://${host}:${port}`,
	apiKey: auth,
})

const posts = client.index('posts');

posts.updateSearchableAttributes(['text']).catch((e) => logger.error(`Setting searchable attr failed, searches won't work: ${e}`));

posts.updateFilterableAttributes(["userName", "userHost", "mediaAttachment", "createdAt"]).catch((e) => logger.error(`Setting filterable attr failed, advanced searches won't work: ${e}`));

logger.info("Connected to MeiliSearch");

export type MeilisearchNote = {
	id: string;
	text: string;
	userId: string;
	userHost: string;
	userName: string;
	channelId: string;
	mediaAttachment: string;
	createdAt: number
}

export default hasConfig ? {
	search: (query : string, limit : number, offset : number) => {

		/// Advanced search syntax
		/// from:user => filter by user + optional domain
		/// has:image/video/audio/text/file => filter by attachment types
		/// domain:domain.com => filter by domain
		/// before:Date => show posts made before Date
		/// after: Date => show posts made after Date


		let constructedFilters: string[] = [];

		let splitSearch = query.split(" ");

		// Detect search operators and remove them from the actual query
		splitSearch.filter(term => {
			if (term.startsWith("has:")) {
				let fileType = term.slice(4);
				constructedFilters.push(`mediaAttachment = "${fileType}"`)
				return false;
			} else if (term.startsWith("from:")) {
				let user = term.slice(5);
				constructedFilters.push(`userName = ${user}`)
				return false;
			} else if (term.startsWith("domain:")) {
				let domain = term.slice(7);
				constructedFilters.push(`userHost = ${domain}`)
				return false;
			} else if (term.startsWith("after:")) {
				let timestamp = term.slice(6);
				// Try to parse the timestamp as JavaScript Date
				let date = Date.parse(timestamp);
				if (isNaN(date)) return false;
				constructedFilters.push(`createdAt > ${date}`)
			} else if (term.startsWith("before:")) {
				let timestamp = term.slice(7);
				// Try to parse the timestamp as JavaScript Date
				let date = Date.parse(timestamp);
				if (isNaN(date)) return false;
				constructedFilters.push(`createdAt < ${date}`)
			}

			return true;
		})

		logger.info(`Searching for ${query}`);
		logger.info(`Limit: ${limit}`);
		logger.info(`Offset: ${offset}`);
		logger.info(`Filters: ${constructedFilters}`)


		return posts.search(splitSearch.join(" "), {
			limit: limit,
			offset: offset,
			filter: constructedFilters
		});
	},
	ingestNote: (note: Note | Note[]) => {
		if (note instanceof Note) {
			note = [note];
		}

		let indexingBatch: MeilisearchNote[] = [];

		note.forEach(note => {

			let attachmentType = "";
			if (note.attachedFileTypes.length > 0) {
				attachmentType = note.attachedFileTypes[0].split("/")[0];
				switch (attachmentType) {
					case "image":
					case "video":
					case "audio":
					case "text":
						break;
					default:
						attachmentType = "file"
						break
				}
			}

			indexingBatch.push({
					id: note.id.toString(),
					text: note.text ? note.text : "",
					userId: note.userId,
					userHost: note.userHost ? note.userHost : "",
					channelId: note.channelId ? note.channelId : "",
					mediaAttachment: attachmentType,
					userName: note.user?.username ? note.user.username : "",
					createdAt: note.createdAt.getTime() / 1000 // division by 1000 is necessary because Node returns in ms-accuracy
				}
			)
		});

		let indexingIDs = indexingBatch.map(note => note.id);

		logger.info("Indexing notes in MeiliSearch: " + indexingIDs.join(","));

		return posts.addDocuments(indexingBatch);
	},
	serverStats: async () => {
		let health : Health = await client.health();
		let stats: Stats = await client.getStats();

		return {
			health: health.status,
			size: stats.databaseSize,
			indexed_count: stats.indexes["posts"].numberOfDocuments
		}
	}
} : null;

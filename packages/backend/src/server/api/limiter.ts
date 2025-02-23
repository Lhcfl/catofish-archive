import Limiter from "ratelimiter";
import Logger from "@/services/logger.js";
import { redisClient } from "@/db/redis.js";
import type { IEndpointMeta } from "./endpoints.js";
import { formatMilliseconds } from "backend-rs";

const logger = new Logger("limiter");

export const limiter = (
	limitation: IEndpointMeta["limit"] & { key: NonNullable<string> },
	actor: string,
) =>
	new Promise<void>((ok, reject) => {
		if (process.env.NODE_ENV === "test") ok();

		const hasShortTermLimit = typeof limitation.minInterval === "number";

		const hasLongTermLimit =
			typeof limitation.duration === "number" &&
			typeof limitation.max === "number";

		if (hasShortTermLimit) {
			min();
		} else if (hasLongTermLimit) {
			max();
		} else {
			ok();
		}

		// Short-term limit
		function min(): void {
			const minIntervalLimiter = new Limiter({
				id: `${actor}:${limitation.key}:min`,
				duration: limitation.minInterval,
				max: 1,
				db: redisClient,
			});

			minIntervalLimiter.get((err, info) => {
				if (err) {
					return reject("ERR");
				}

				logger.debug(
					`${actor} ${limitation.key} min remaining: ${info.remaining}`,
				);

				if (info.remaining === 0) {
					reject("BRIEF_REQUEST_INTERVAL");
				} else {
					if (hasLongTermLimit) {
						max();
					} else {
						ok();
					}
				}
			});
		}

		// Long term limit
		function max(): void {
			const limiter = new Limiter({
				id: `${actor}:${limitation.key}`,
				duration: limitation.duration,
				max: limitation.max,
				db: redisClient,
			});

			limiter.get((err, info) => {
				if (err) {
					return reject("ERR");
				}

				logger.debug(
					`${actor} ${limitation.key} max remaining: ${info.remaining}`,
				);

				if (info.remaining === 0) {
					reject({
						message: "RATE_LIMIT_EXCEEDED",
						remainingTime: formatMilliseconds(info.resetMs - Date.now()),
					});
				} else {
					ok();
				}
			});
		}
	});

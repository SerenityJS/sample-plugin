import { BasePlugin } from "@serenityjs/plugins";

import type { Serenity } from "@serenityjs/launcher";
import type { Logger } from "@serenityjs/logger";

/**
 * Sample plugin for the Serenity server.
 */
export default class SamplePlugin extends BasePlugin {
	// The constructor is not required, as it is inherited from the BasePlugin class.
	public constructor(serenity: Serenity, logger: Logger) {
		super(serenity, logger);
	}

	public startup(): void {
		// Log the plugin startup.
		this.logger.info("Sample plugin started.");
	}
}

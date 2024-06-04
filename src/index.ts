import type { Serenity } from "@serenityjs/launcher";
import type { Plugin } from "@serenityjs/plugins";

/**
 * Fired when the plugin is registered
 * @param data The data of the plugin, such as the logger and config
 * @param serenity The serenity instance of the server
 */
export function onRegister(data: Plugin): void {
	// Get the logger of the plugin
	const { logger } = data;

	// Log that the plugin has been registered
	logger.info("Plugin has been registered!");
}

/**
 * Fired when the plugin is started
 * @param serenity The serenity instance of the server
 * @param data The data of the plugin, such as the logger and config
 */
export function onStartup(serenity: Serenity, data: Plugin): void {
	// Get the logger of the plugin
	const { logger } = data;

	// Log that the plugin has been started
	logger.info("Plugin has been started!");

	// Wait for a player to spawn in the world
	serenity.on("PlayerSpawned", (event) => {
		// Send a message to the player
		event.player.sendMessage("Hello, world!");
	})
}

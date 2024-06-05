import type { Serenity } from "@serenityjs/launcher";
import type { Plugin } from "@serenityjs/plugins";

/**
 * Fired when the plugin is initialized
 * @param serenity The serenity instance of the server
 * @param data The data of the plugin, such as the logger and config
 */
export function onInitialize(serenity: Serenity, data: Plugin): void {
	// Get the logger of the plugin
	const { logger } = data;

	// Log that the plugin has been registered
	logger.info("Plugin has been registered!");

	// This method should be used to register Blocks, Items, Entities, etc.
	// Also should be used to register WorldProviders, TerrainGenerators, etc.
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

/**
 * Fired when the plugin is stopped
 * @param serenity The serenity instance of the server
 * @param data The data of the plugin, such as the logger and config
 */
export function onShutdown(serenity: Serenity, data: Plugin): void {
	// Get the logger of the plugin
	const { logger } = data;

	// Log that the plugin has been stopped
	logger.info("Plugin has been stopped!");
}
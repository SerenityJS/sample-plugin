import { BasePlugin } from "@serenityjs/plugins";
import { ItemStack } from "@serenityjs/world";
import { ItemType } from "@serenityjs/item";
import { BlockIdentifier, BlockPermutation } from "@serenityjs/block";

import type {
	PlayerChatSignal,
	PlayerJoinedSignal,
	PlayerSpawnedSignal,
	Serenity
} from "@serenityjs/launcher";
import type { Logger } from "@serenityjs/logger";

/**
 * Sample plugin for the Serenity server.
 */
export default class SamplePlugin extends BasePlugin {
	// The constructor is not required, as it is inherited from the BasePlugin class.
	public constructor(serenity: Serenity, logger: Logger) {
		super(serenity, logger);

		// The signal hooks for the plugin.
		serenity.on("PlayerJoined", this.onJoin.bind(this));
		serenity.on("PlayerSpawned", this.onSpawn.bind(this));
		serenity.before("PlayerChat", this.onChat.bind(this));

		// Command Registration
		// Register the command "ping" with the plugin.
		const world = serenity.getWorld(); // Gets the default world.
		world.commands.register("ping", "Sample command for the plugin.", () => {
			// Return the message "Pong!" when the command is executed.
			return {
				message: "Pong!"
			}
		});
	}

	public startup(): void {
		// Log the plugin startup.
		this.logger.info("Sample plugin started.");
	}

	// The event listener for the player join signal.
	public onJoin(event: PlayerJoinedSignal): void {
		// Log the player join event from the plugin.
		this.logger.info(`${event.player.username} has joined the game.`);
	}

	// The event listener for the player spawned signal.
	public onSpawn(event: PlayerSpawnedSignal): void {
		// Lets add a glowing obsidian block to the player's inventory.
		// First we must find the permutation for the block.
		const permutation = BlockPermutation.resolve(
			BlockIdentifier.Glowingobsidian
		);

		// Now we can create a new item stack with the block.
		const item = ItemStack.create(
			ItemType.resolve(permutation.type), // Item type from the block type.
			1, // Item amount.
			permutation.index // The item metadata, which is eqivalent to the permutation index.
		);

		// Get the player's inventory component.
		const inventory = event.player.getComponent("minecraft:inventory");

		// Add the item to the inventory.
		inventory.container.addItem(item);

		// Now lets let the player know that we have added the item to their inventory.
		event.player.sendMessage("Added glowing obsidian to your inventory!");

		this.logger.info(
			`Added glowing obsidian to the ${event.player.username}'s inventory.`
		);
	}

	// The event listener for the player chat signal.
	public onChat(event: PlayerChatSignal): boolean {
		// Check if the player said "cancel", then cancel the chat event.
		if (event.message === "cancel") return false;

		// Add a prefix to the player's message.
		event.message = `Plugin Did This: ${event.message}`;

		// return true to continue the chat event.
		return true;
	}
}

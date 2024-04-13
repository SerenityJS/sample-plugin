import { BasePlugin } from "@serenityjs/plugins";
import { ItemStack } from "@serenityjs/world";
import { ItemType } from "@serenityjs/item";
import { Packet } from "@serenityjs/protocol";
import { BlockIdentifier, BlockPermutation } from "@serenityjs/block";

import type { Serenity } from "@serenityjs/launcher";
import type { Logger } from "@serenityjs/logger";

/**
 * Sample plugin for the Serenity server.
 */
export default class SamplePlugin extends BasePlugin {
	// The constructor is not required, as it is inherited from the BasePlugin class.
	public constructor(serenity: Serenity, logger: Logger) {
		super(serenity, logger);

		// Log the plugin initialization.
		logger.info("Sample plugin initialized.");

		// Since there are no events registered for Serenity yet, we will use the "before" method to listen for packets.
		// This packet is sent when the local player is initialized. AKA the player spawned in the world.
		serenity.network.before(Packet.SetLocalPlayerAsInitialized, (data) => {
			// First we must get the player instance from the session.
			// Which the Serenity instance provides.
			const player = serenity.getPlayer(data.session);

			// Check if the player is null and return false if it is.
			if (!player) return false; // This will stop the packet from being processed.

			// Now lets add some items to the player's inventory.
			// We will give the player glowing obsidian.

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
			const inventory = player.getComponent("minecraft:inventory");

			// Add the item to the inventory.
			inventory.container.addItem(item);

			// Now lets let the player know that we have added the item to their inventory.
			player.sendMessage("Added glowing obsidian to your inventory!");

			logger.info(
				`Added glowing obsidian to the ${player.username}'s inventory.`
			);
		});
	}
}

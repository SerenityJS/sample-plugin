import { Serenity } from "@serenityjs/serenity";
import { WorldEvent } from "@serenityjs/world"

// This function is the main starting point for your plugin.
// The function is called once all worlds and other plugins have been loaded.
export function onStartup(serenity: Serenity) {
  // Listen for when a player breaks a block
  serenity.worlds.on(WorldEvent.PlayerBreakBlock, (event) => {
   // Get the world that the event occurred in
    const world = event.world

    // Tell the player that they broke a block, and what block they broke
    const blockType = event.block.getType()
    event.player.sendMessage(`You broke a block of type: ${blockType.identifier}, in world ${world.identifier}`)
  })
}

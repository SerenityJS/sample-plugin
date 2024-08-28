import { Serenity } from "@serenityjs/serenity";
import { WorldEvent } from "@serenityjs/world"

export function onStartup(serenity: Serenity) {
  // Listen for when a player places a block
  serenity.worlds.on(WorldEvent.PlayerPlaceBlock, (event) => {
    // Get the world that the event occurred in
    const world = event.world

    // Tell the player that they placed a block, and what block they placed
    const blockType = event.block.getType()
    event.player.sendMessage(`You placed a block of type: ${blockType.identifier}, in world ${world.identifier}`)
  })
}
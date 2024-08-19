import { WorldEvents, WorldEvent } from "@serenityjs/world"

// Listen for when a player breaks a block
WorldEvents.on(WorldEvent.PlayerBreakBlock, (event) => {
  // This method will always return the world that the event was fired in.
  const world = event.getWorld()

  // Tell the player that they broke a block, and what block they broke
  const blockType = event.block.getType()
  event.player.sendMessage(`You broke a block of type: ${blockType.identifier}, in world ${world.identifier}`)
})

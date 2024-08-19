import { WorldEvents, WorldEvent } from "@serenityjs/world"

// Listen for when a player places a block
WorldEvents.on(WorldEvent.PlayerPlaceBlock, (event) => {
  // This method will always return the world that the event was fired in.
  const world = event.getWorld()

  // Tell the player that they placed a block, and what block they placed
  const blockType = event.block.getType()
  event.player.sendMessage(`You placed a block of type: ${blockType.identifier}, in world ${world.identifier}`)
})

import { WorldEvents, WorldEvent } from "@serenityjs/world"
import { HealthBarComponent } from "../components/health-bar"

// Listen for when an entity is spawned
WorldEvents.on(WorldEvent.EntitySpawned, (event) => {
  // This method will always return the world that the event was fired in.
  const world = event.getWorld()

  // Add our custom component to the entity
  new HealthBarComponent(event.entity)
})
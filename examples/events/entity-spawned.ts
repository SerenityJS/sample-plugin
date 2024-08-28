import { WorldEvent } from "@serenityjs/world"
import { Serenity } from "@serenityjs/serenity"
import { HealthBarComponent } from "../components/health-bar"

// This function is the main starting point for your plugin.
// The function is called once all worlds and other plugins have been loaded.
export function onStartup(serenity: Serenity) {
  // Listen for when an entity is spawned
  serenity.worlds.on(WorldEvent.EntitySpawned, (event) => {
    // Add our custom component to the entity
    new HealthBarComponent(event.entity)
  })
}
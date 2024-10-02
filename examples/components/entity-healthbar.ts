import { Serenity } from "@serenityjs/serenity";
import { Entity, EntityComponent, WorldEvent } from "@serenityjs/world";

// Since we want the healthbar to be active for all entity's with health
// We don't need to specify the entity types, but instead we can add the component when entities are spawned
// This will allow us to add the component to all entities with health
export function onInitialize(serenity: Serenity) {
  // Now we can listen for when entities are spawned
  serenity.worlds.on(WorldEvent.EntitySpawned, ({ entity }) => {
    // We want to make sure we filter out any entities that are players,
    // As we don't want to add a health bar to players
    // To do this, the Entity class contains a `isPlayer` method
    if (entity.isPlayer()) return; // Return if the entity is a player
    
    // Now we can add the health bar component to the entity
    // To do this, we need to create a new instance of the component and pass the entity
    new HealthBarComponent(entity);

    // All entities with a health component will now have a health bar
  });
}

class HealthBarComponent extends EntityComponent {
  // This is used to identify the component during runtime and leveldb serialization
  public static readonly identifier = "healthbar";

  // We can store the entity nametag from before the health bar was added
  // Then we can place the nametag under the health bar
  public readonly nametag: string | null = null;

  // Constuctors for custom components are not required
  // But in this case, we are using it to store the nametag
  public constructor(entity: Entity) {
    super(entity, HealthBarComponent.identifier);

    // Store the entity's nametag
    this.nametag = entity.getNametag();
  }

  // We will want to update the healthbar every tick to ensure it is accurate
  // So we will use the `onTick` method
  public onTick(): void {
    // Get the health component of the entity
    const healthComponent = this.entity.getComponent("minecraft:health");

    // Return if the entity does not have a health component
    // Some entities may not have health, so we can just remove this component
    if (!healthComponent) {
      // Delete the health bar component from the entity
      this.entity.components.delete(HealthBarComponent.identifier);

      // Break out of the method
      return;
    }

    // Get the health of the entity
    const healthCurrent = healthComponent.getCurrentValue();
    const healthMax = healthComponent.effectiveMax;

    // Calculate the health percentage
    const nametag = this.nametag ?
      `${this.nametag}\nHealth: ${healthCurrent}/${healthMax}` :
      `Health: §c${healthCurrent}§r/§c${healthMax}§r`;

    // Set the entity's health bar
    // Adding the `true` parameter will make the nametag always visible
    this.entity.setNametag(nametag, true);
  }
}

export { HealthBarComponent };
import { EntityIdentifier } from "@serenityjs/entity";
import { Serenity } from "@serenityjs/serenity";
import { Entity, EntityComponent, EntityInteractType, Player, WorldEvent } from "@serenityjs/world";

// Custom components need to extend the `EntityComponent` class
// They also need to be registered to the World when the plugin is loaded
export function onInitialize(serenity: Serenity) {
  // Wait for a world to initialize
  serenity.worlds.on(WorldEvent.WorldInitialize, ({ world }) => {
    // Register the custom component to the world
    world.entities.registerComponent(CustomEntityComponent);
  });
}

class CustomEntityComponent extends EntityComponent {
  // This is used to identify the component during runtime and leveldb serialization
  public static readonly identifier = "custom_entity_component";

  // The entity types that this component will automatically attach to
  // In this example, will we attach this component to the Zombie entity type
  public static readonly types = [EntityIdentifier.Zombie];

  // Constuctors for custom components are not required, but can be used to initialize additional data
  public constructor(entity: Entity) {
    super(entity, CustomEntityComponent.identifier);
  }

  // This method will be called anytime the entity is ticked
  // Serenity has a simulation distance, so entities will only tick when players are within a certain distance
  // The simulation distance per-world in the `config.json` file in the world's directory
  public onTick(deltaTick: number): void {
    // Delta tick is the time since the last tick
    // This can be used to detect it there was a lag spike or if the server is running slow

    // You can access the entity using `this.entity`
    const entity = this.entity;
  }

  // This method will be called when the entity is spawned into a world
  public onSpawn(): void {
    // You can access the entity using `this.entity`
    const entity = this.entity;

    // You can get the entity's current dimension using `entity.dimension`
    const dimension = entity.dimension;

    // Can can also get the entity's current world using `dimension.world` or `entity.getWorld()`
    const world = entity.getWorld();
  }

  // This method will be called when the entity is despawned from the world
  public onDespawn(): void {
    // You can access the entity using `this.entity`
    const entity = this.entity;

    // You can get the entity's current dimension using `entity.dimension`
    const dimension = entity.dimension;

    // Can can also get the entity's current world using `dimension.world` or `entity.getWorld()`
    const world = entity.getWorld();
  }

  // This method will be called when the entity is interacted with by a player
  // The `type` parameter is the type of interaction that occurred
  // This will indicate if the player Intectacted or Attacked the entity
  public onInteract(player: Player, type: EntityInteractType): void {
    // You can access the entity using `this.entity`
    const entity = this.entity;

    // We can determine if the player interacted with the entity or attacked the entity
    const action = type === EntityInteractType.Interact ? "interacted" : "attacked";

    // You can access the player using the `player` parameter
    // The player is the player that interacted with the entity
    player.sendMessage(`You ${action} with the entity (${entity.unique})`);
  }
}

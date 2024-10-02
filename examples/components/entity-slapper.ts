import { StringEnum } from "@serenityjs/command";
import { EntityIdentifier } from "@serenityjs/entity";
import { CompoundTag, ListTag, StringTag, Tag } from "@serenityjs/nbt";
import { CommandPermissionLevel } from "@serenityjs/protocol";
import { Serenity } from "@serenityjs/serenity";
import { Entity, EntityComponent, EntityEnum, Player, WorldEvent } from "@serenityjs/world";

// We then want to create a custom command that will allow players to create a slapper entity
export function onInitialize(serenity: Serenity) {
  // Wait for a world to initialize
  serenity.worlds.on(WorldEvent.WorldInitialize, ({ world }) => {
    // We want to register the component to the world
    world.entities.registerComponent(EntitySlapperComponent);

    // Register the custom command to the world
    world.commands.register(
      "slapper",
      "Create a slapper entity",
      (registry) => {
        // We will make the command require the player to be an operator
        registry.permissionLevel = CommandPermissionLevel.Operator;

        // The command will have an argument for the entity type
        // And an additional argument for the command to execute when the entity is interacted with
        registry.overload(
          {
            entity: EntityEnum,
            command: StringEnum
          },
          (context) => {
            // We then want to get the entity identifier from the context
            // Note: This isn't the proper to handle the entity identifier, but it is used for demonstration purposes
            // You would want to take into consideration custom entities will have a different namespace rather than "minecraft"
            const identifier = "minecraft:" + context.entity.result as EntityIdentifier;

            // We can also get the player from the context
            const player = context.origin as Player;

            // Now we can create the entity using the identifier
            const entity = player.dimension.spawnEntity(identifier, player.position);

            // Once the entity is created, we can add the slapper component to the entity
            // We will also add the command to the component
            const slapper = new EntitySlapperComponent(entity);
            slapper.commands.push(context.command.result as string);

            // We can then send a message to the player
            return { message: "Slapper entity created!" };
          } 
        )
      },
      () => { throw new TypeError("No overload matched the selector!"); }
    )
  });
}

class EntitySlapperComponent extends EntityComponent {
  // This is used to identify the component during runtime and leveldb serialization
  public static readonly identifier = "entity_slapper";

  // The commands that the player will execute when the entity is interacted with
  public readonly commands: string[] = [];

  // Constuctors for custom components are not required
  public constructor(entity: Entity) {
    super(entity, EntitySlapperComponent.identifier);
  }

  // This method will be called when the entity is spawned into a world
  // We want to remove the entity's health component, as we don't want the entity to take damage
  public onSpawn(): void {
    // We should remove the entities health component
    // As we don't want the entity to take damage
    this.entity.removeComponent("minecraft:health");
  }

  // For this example, we will use the `onInteract` method to execute the commands
  // We want to apply the logic to all interactions, so we will not use the `type` parameter
  public onInteract(player: Player): void {
    // Loop through each command in the component
    for (const command of this.commands) {
      // Execute the command as the player
      player.executeCommand(command);

      // Since the commands are executed for the player, permissions will not be checked
    }
  }

  // This method is a static method used to serialize the component data into nbt format
  // Developers aren't limited to a data limit, but it is recommended to keep the decently small
  // This data will be stored in the entity's nbt data, and will be stored in the world's leveldb
  public static serialize(nbt: CompoundTag, component: EntitySlapperComponent): void {
    // The method automatically provides a nbt tag that will hold data only related to this component
    // So you won't need to worry about conflicting keys with other components
    // This method also provides the component instance, so you can access the component's data

    // In this case, we will store the commands from the component into the nbt tag
    // First, we need to create a list tag with a type of string.
    const commands = nbt.createListTag("Commands", Tag.String);

    // Now we can add each command from the component to the list tag
    for (const command of component.commands) {
      // We can create a new string tag with the command and add it to the list tag
      const nbt = new StringTag("", command); // We don't need to provide a key, as the list tag will automatically assign one

      // Add the string tag to the list tag
      commands.push(nbt);
    }

    // We have successfully added all the commands to the list tag
    // Since the method provides the nbt tag, we are done.
  }

  // This method is a static method used to deserialize the component data from nbt format
  // We are basically doing the opposite of the serialize method
  // We must then return a new instance of the component with the deserialized data
  public static deserialize(nbt: CompoundTag, entity: Entity): EntitySlapperComponent {
    // The method automatically provides a nbt tag that holds data only related to this component
    // So you won't need to worry about conflicting keys with other components

    // So first, we need to get the list tag that holds the commands
    const commands = nbt.getTag<ListTag<StringTag>>("Commands")!;

    // Now we can create a new instance of the component with the entity
    const component = new EntitySlapperComponent(entity);

    // Now we can loop through each string tag in the list tag
    for (const command of commands.value) {
      // We can get the value of the string tag and add it to the component
      component.commands.push(command.value);
    }

    // We have successfully deserialized the data
    // Now we can return the new instance of the component
    return component;
  }
}

import { CommandPermissionLevel } from "@serenityjs/protocol";
import { Serenity } from "@serenityjs/serenity";
import { Dimension, World, WorldEvent } from "@serenityjs/world";

export function onInitialize(serenity: Serenity) {
  // Wait for a world to initialize
  serenity.worlds.on(WorldEvent.WorldInitialize, ({ world }) => register(world));
}

export function onShutdown(serenity: Serenity) {
  // Unregister the command for all worlds
  for (const world of serenity.worlds.getAll())
    unregister(world);
}

/**
 * Register the custom command for the world
 * @param world The world to register the command for
 */
function register(world: World) {
  // Register a new command
  world.commands.register(
    "example2", // The name of the command
    "example2 description", // The description of the command
    (registry) => { // The callback function when the command is registered
      // The command registry object allows you to set additional properties for the command.
      // This is where you would create additional overloads for the command.
      // And set the permission level required to execute the command.

      // In this example, we are setting the permission level of Operator is required to execute the command.
      registry.permissionLevel = CommandPermissionLevel.Operator;
    },
    (context) => { // The callback function when the command is executed
      // Once the callback is called, the command is considered to be executed.
      // The context object contains the origin of the command, as well as parameters.
      // In this use case, we don't have any parameters.

      // The origin of the context can be an Entity instance, or a Dimension instance.
      // Since players are entities, we can apply an additional check to see if the origin is a player.
      // We can apply logic based on the origin of the command.
      if (context.origin instanceof Dimension) {
        return { message: "You are a dimension!" }
      } else if (context.origin.isPlayer()) {
        return { message: "You are a player!" }
      } else {
        return { message: "You are an entity!" }
      }

      // The return value of the callback function is sent back to the origin of the command.
      // The return value can include a message property, which is sent back to the origin.
      // You can also add additional properties to the return value, which can be used in other plugins.
      // The additional properties can also be accessed when calling `executeCommand` for a dimension or entity.
      return {
        "message": "You are something else!",
        "additional": "This is an additional property!"
      }
    }
  );
}

function unregister(world: World) {
  // Unregister the command
  world.commands.unregister("example2");
}
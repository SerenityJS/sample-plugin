import { StringEnum } from "@serenityjs/command";
import { Serenity } from "@serenityjs/serenity";
import { Entity, TargetEnum, World, WorldEvent } from "@serenityjs/world";

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
    "example3", // The name of the command
    "example3 description", // The description of the command
    (registry) => { // The callback function when the command is registered
      // The command registry object allows you to set additional properties for the command.
      // This is where you would create additional overloads for the command.
      // And set the permission level required to execute the command.

      // In this example, we will be creating 2 overloads for the command.
      // The overload parameter keys can be any string.
      registry.overload(
        {
          test_value: StringEnum, // The first overload parameter is a string
        },
        (context) => { // The callback function if the overload is matched
          // Once the callback is called, the overload is considered to be matched.
          // We can then use the context object to access the parameters of the overload.
          const value = context.test_value.result as string;

          // We will return a message with the value of the test_value parameter.
          return { message: `You provided a string: ${value}` }
        }
      )

      // Next we will create another overload for the command.
      // This time we will specify a target to receive the value of the test_value parameter.
      // The target can be an entity or a player.
      registry.overload(
        {
          target: TargetEnum,
          test_value: StringEnum, // The second overload parameter is a string
        },
        (context) => { // The callback function if the overload is matched
          // Once the callback is called, the overload is considered to be matched.
          // We can then use the context object to access the parameters of the overload.
          const value = context.test_value.result as string;

          // The target parameter returns an array of entities.
          // Since the command operator allows for multiple targets.
          const targets = context.target.result as Entity[];

          // We can check if any targets were provided.
          if (targets.length === 0)
            throw new Error("No target matched the specified selector.");

          // Once that we asserted that there is at least one target, we can iterate over the targets.
          for (const target of targets) {
            // We will want to make sure that the target is a player.
            // If the target is not a player, we will skip the target.
            if (!target.isPlayer()) continue;

            // Now we can send the value of the test_value parameter to the player.
            target.sendMessage(value);
          }
        },
      )
    },
    (context) => { // The callback function when no overload is matched
      // This callback function is called when no overload is matched.
      // This can be used to provide a default behavior for the command.
      // In this case, we will throw a type error if no overload is matched.
      throw new TypeError("No overload matched the specified parameters.");

      // As always, the context object contains the origin of the command, as well as parameters.
      // But in this instance, the parameters are not accessible, as no overload was matched.
    }
  );
}

function unregister(world: World) {
  // Unregister the command
  world.commands.unregister("example3");
}
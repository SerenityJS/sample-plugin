import { CustomEnum, StringEnum } from "@serenityjs/command";
import { Serenity } from "@serenityjs/serenity";
import { Entity, TargetEnum, World, WorldEvent } from "@serenityjs/world";

// We can define a custom enum by extending the CustomEnum class.
// The options of the enum are defined as a static property of the class.
// If one of the options is not matched, the command will throw an error.
class ExampleEnum extends CustomEnum {
  public static readonly identifier = "example"; // This is used to identify the enum
  public static readonly options = ["option1", "option2", "option3"]; // These are the options of the enum
}

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
    "example4", // The name of the command
    "example4 description", // The description of the command
    (registry) => { // The callback function when the command is registered
      // The command registry object allows you to set additional properties for the command.
      // This is where you would create additional overloads for the command.
      // And set the permission level required to execute the command.

      // In this example, we will be creating 2 overloads for the command.
      // The overload parameter keys can be any string.
      registry.overload(
        {
          test_value: ExampleEnum, // The first overload parameter is a custom enum
        },
        (context) => { // The callback function if the overload is matched
          // Once the callback is called, the overload is considered to be matched.
          // We can then use the context object to access the parameters of the overload.
          const value = context.test_value.result as "option1" | "option2" | "option3";

          // We will return a message with the value of the test_value parameter.
          return { message: `You provided a string: ${value}` }
        }
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
  world.commands.unregister("example4");
}
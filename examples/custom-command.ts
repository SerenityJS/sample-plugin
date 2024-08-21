import { CustomEnum, IntegerEnum, StringEnum } from "@serenityjs/command";
import { CommandPermissionLevel } from "@serenityjs/protocol";
import { Serenity } from "@serenityjs/serenity";
import { Entity, Player, TargetEnum } from "@serenityjs/world";

export function onStartup(serenity: Serenity): void {
  // First we need to get the world we want to register the custom command to.
  const world = serenity.worlds.get("default");

  // Now we can register the custom command to the world.
  // This command will be available to all players/entities/dimensions in the world.
  // This command also has no permissions or enums, so anyone can use it.
  world.commands.register("ping", "Ping the server!", () => {
    return { message: "Pong!" }
  })

  // Lets create a command that requires operator permissions to use.
  // And only players can use this command.
  world.commands.register(
    "player-command",
    "A command that only players can use.",
    (origin) => {
      // The origin parameter is also either a Entity or Dimension instance.
      // Since players are entities, we can check the instance type to see if the origin is a player.
      if (!(origin instanceof Player))
        return { message: "Only players can use this command." }

      // Send a message to the player that used the command.
      return { message: "You are a player!" }
    },
    {},
    {
      permission: CommandPermissionLevel.Operator,
    }
  )

  // We can also create command that use enums.
  world.commands.register(
    "enum-command",
    "A command that uses enums.",
    (_, parameters) => {
      // Get the result of the enum parameter.
      const stringResult: string = parameters.string.result;
      const targetResult: Entity[] = parameters.target.result;
      const numberResult: number = parameters.number.result;

      return { message: "Enum command!" }
    },
    {
      string: StringEnum,
      target: TargetEnum,
      number: IntegerEnum,
    }
  )

  // Custom enums can also be used in the command registration.
  world.commands.register(
    "custom-enum-command",
    "A command that uses custom enums.",
    (_, parameters) => {
      // Get the result of the custom enum parameter.
      const testResult: string = parameters.test_enum.result;

      return { message: "Custom enum command!" + testResult }
    },
    {
      test_enum: TestEnum,
    }
  )
}

// You can also create custom enums with specific values.
// This enum then can be directly used in the command registration.
class TestEnum extends CustomEnum {
  public static readonly name = "test_enum";
  public static readonly options = ["option1", "option2", "option3"];
}

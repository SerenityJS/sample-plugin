## Creating Custom Commands

Custom commands allow developers to create easy interactions with their plugins or with the environment of their server. Custom commands break away from the predefined commands found in a vanilla Bedrock server. Serenity offers an easy-to-use system for creating a simple command or commands that have multiple overloads with optional parameters.

### Getting Started

Commands can be registered to a specific world, which means commands are not under a server-wide scope. Commands should be initialized as soon as the targeted world is fully initialized. This ensures that all players in this world have the correct command interface. Commands can also be registered anytime during runtime, but you will have to manually sync the commands to the players in the world. It is also encouraged to unregister custom commands upon the shutdown of your plugin.

Custom commands allow overloading once the name and description are defined. Overloading allows developers to indicate if the command will need additional parameters to allow for more functions. Commands are not limited to a specific number of overloads. The additional parameters can either be required or optional, based on the parameter definition.

Serenity has a few default parameter enums that allow for vanilla functionality, which can be imported from the following packages.

**@serenityjs/command**: `BooleanEnum`, `StringEnum`, `IntegerEnum`, and `CustomEnum`  
**@serenityjs/world**: `TargetEnum`, `PositionEnum`, `GamemodeEnum`, `ItemEnum`, `BlockEnum`, and `EntityEnum`  
**@serenityjs/serenity**: `WorldsEnum`

Serenity also allows the definition of CustomEnums by using the `CustomEnum` class from the `@serenityjs/command` package. Please follow the additional TypeScript files for the proper usage of registering custom server commands.

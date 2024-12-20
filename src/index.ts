import { Plugin, PluginEvents, PluginType } from "@serenityjs/plugins";

// This is a sample plugin that has a class-based implementation.
// In Serenity, there are two types of plugins: class-based and function-based.
// Class-based plugins are more flexible and can be used to create more complex plugins.
// Function-based plugins are simpler and are used for creating simple plugins.

class SamplePlugin extends Plugin implements PluginEvents {
  // Type declares the type of the plugin.

  // An addon plugin is bundled to the most simplistic form, without any type declarations.
  // Addon plugins are extracted at runtime and are destroyed after the server is shut down.
  // Addon plugins are used for creating simple commands, events, and other features that don't require a lot of complexity.

  // An api plugin is a plugin that exposes an api to allow other plugins to interact with.
  // Api plugins are extracted once, and the source file is deleted after the extraction.
  // The api plugin is then added to the server workspace, and other plugins can interact with it.
  // Api plugins are used for creating complex features that require multiple plugins to interact with each other.
  // Some examples of api plugins are the land claim plugin, the economy plugin, and the permission plugin.
  public readonly type = PluginType.Addon;

  public constructor() {
    // Super assigns the name and version of the plugin.
    // There is an additional parameter that can be passed to the super constructor,
    // but since this is a class-based plugin, it is not required, as the properties & methods can be directly created in the class.
    super("sample-plugin", "1.0.0");
  }

  // This method is called right after the plugin is loaded from the file system.
  // Once this method is called, `this.serenity` & `this.pipeline` will be in scope.
  // This method should be used when registering any custom features; such as commands, traits, generators, providers, blocks, etc.
  public onInitialize(): void {
    this.logger.info("Sample plugin initialized!");
  }

  // This method is called once all plugins have been initialized and all worlds have been loaded.
  // This method should be used to start any services and tasks that the plugin requires.
  public onStartUp(): void {
    this.logger.info("Sample plugin started up!");
  }

  // This method is called when the server is shutting down, but is called before the worlds and raknet server are shut down.
  // This method should be used to stop any services and tasks that the plugin started up.
  // This also should be used to clean up any resources that the plugin created via the `onInitialize` method.
  public onShutDown(): void {
    this.logger.info("Sample plugin shut down!");
  }
}

export default new SamplePlugin();

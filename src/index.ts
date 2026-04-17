import { Plugin, PluginEvents, PluginPriority } from "@serenityjs/plugins";

// This is a sample plugin that has a class-based implementation.
// In Serenity, there are two types of plugins: class-based and function-based.
// Class-based plugins are more flexible and can be used to create more complex plugins.
// Function-based plugins are simpler and are used for creating simple plugins.

class SamplePlugin extends Plugin implements PluginEvents {
  // Declare the priorty of the plugin.

  // Depending on the priority, plugins will be initialized in a specific order.
  // Plugins with a higher priority will be initialized first.
  public readonly priority: PluginPriority = PluginPriority.Low;

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
  public onStartUp(): Promise<void> {
    this.logger.info("Sample plugin started up!");
    return Promise.resolve();
  }

  // This method is called when the server is shutting down, but is called before the worlds and raknet server are shut down.
  // This method should be used to stop any services and tasks that the plugin started up.
  // This also should be used to clean up any resources that the plugin created via the `onInitialize` method.
  public onShutDown(): Promise<void> {
    this.logger.info("Sample plugin shut down!");
    return Promise.resolve();
  }
}

export default new SamplePlugin();

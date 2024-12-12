import { Plugin, PluginType } from "@serenityjs/plugins";

// This is a sample plugin that has a function-based implementation.

/**
 * @param {Plugin} plugin 
 */
function onInitialize(plugin) {
  plugin.logger.info("Sample plugin initialized!");
}

/**
 * @param {Plugin} plugin 
 */
function onStartUp(plugin) {
  plugin.logger.info("Sample plugin started up!");
}

/**
 * @param {Plugin} plugin 
 */
function onShutDown(plugin) {
  plugin.logger.info("Sample plugin shut down!");
}

// Export a new instance of the Plugin class with the name and version of the plugin.
export default new Plugin(
  "sample-plugin",
  "1.0.0",
  {
    type: PluginType.Addon,
    onInitialize,
    onStartUp,
    onShutDown
  }
)
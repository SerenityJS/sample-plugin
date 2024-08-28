# Introduction
The SerentityJS sample plugin provides a basic configuration for plugin usage in the software. To get started, either clone this repo or create a new repository using this template. A firm understanding of TypeScript and JavaScript will be very beneficial for plugin development.

## Usage
The plugin system in SerenityJS is pretty simple to use and to develop on. Make sure you place your plugin within the `plugins` directory within your SerenityJS server. Once the server starts up, it will recognize the plugin and process it accordingly. Plugins that are written in TypeScript will be built upon usage. Visit our [documentation](https://serenityjs.net/) to get started!

## Building
This plugin sample uses TypeScript to build your plugin. Anytime you make a change to your plugin, you will need to transpile your code into pure JavaScript. To do this, run the command `npm run build` in the source directory of your plugin. You should notice a new `dist` directory was created. The will be the entry point to your plugin.
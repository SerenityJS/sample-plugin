import { DisconnectReason } from "@serenityjs/protocol";
import { Serenity } from "@serenityjs/serenity";
import { WorldEvent } from "@serenityjs/world"

// Define a list of banned IP addresses
const bannedIps = [ "127.0.0.1" ];

// This function is the main starting point for your plugin.
// The function is called once all worlds and other plugins have been loaded.
export function onStartup(serenity: Serenity) {
  // Listen for when a player joins the world
  serenity.worlds.on(WorldEvent.PlayerJoin, (event) => {
    // Get the player that joined the world
    const player = event.player

    // Get the player's IP address
    const ip = player.session.identifier.address

    // Check if the player's IP address is banned
    if (bannedIps.includes(ip)) {
      // Kick the player from the server
      player.session.disconnect("You are banned from this server.", DisconnectReason.Kicked)
    }
  })
}

import { DisconnectReason } from "@serenityjs/protocol";
import { WorldEvents, WorldEvent } from "@serenityjs/world"

// Define a list of banned IP addresses
const bannedIps = [ "127.0.0.1" ];

// Listen for when a player joins the world
WorldEvents.on(WorldEvent.PlayerJoin, (event) => {
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

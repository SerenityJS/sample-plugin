import type { Logger, PlayerSpawned, Serenity } from '@serenityjs/serenity';
import { BasePlugin } from '@serenityjs/serenity';

/**
 * Sample plugin for the Serenity server.
 */
export default class SamplePlugin extends BasePlugin {
	// The constructor is not required, as it is inherited from the BasePlugin class.
	public constructor(serenity: Serenity, logger: Logger) {
		super(serenity, logger);

		// Listen to the PlayerSpawned event.
		this.serenity.before('PlayerSpawned', this.onPlayerSpawned.bind(this));
	}

	// Fires when the plugin is started.
	public startup(): void {
		this.logger.info('Sample plugin has started!');
	}

	// Fires when the plugin is stopped.
	public shutdown(): void {
		this.logger.info('Sample plugin has stopped!');
	}

	// Fires when a player sends a chat message.
	protected onPlayerSpawned(event: PlayerSpawned): boolean {
		// Send a welcome message to the player.
		event.player.sendMessage('Welcome to the server!');

		// Allow the event to continue.
		// If false, the event will be cancelled.
		return true;
	}
}

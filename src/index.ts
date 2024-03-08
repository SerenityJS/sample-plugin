import type { Logger, Serenity } from '@serenityjs/serenity';

export default class SamplePlugin {
  /**
   * The Serenity instance.
  */
	public readonly serenity: Serenity;

  /**
   * The logger instance.
   */
	public readonly logger: Logger;

  /**
   * Creates a new instance of the plugin.
   *
   * @param serenity The Serenity instance.
   * @param logger The logger instance.
   */
	public constructor(serenity: Serenity, logger: Logger) {
		this.serenity = serenity;
		this.logger = logger;

    // Log a message to the console.
		this.logger.info('Hello world from the sample plugin!');
	}
}

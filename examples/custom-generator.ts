import { Chunk, TerrainGenerator } from "@serenityjs/world";
import { DimensionType } from "@serenityjs/protocol";
import { BlockIdentifier, BlockPermutation } from "@serenityjs/block";
import { Serenity } from "@serenityjs/serenity";

// Introduction: This is an example for creating a custom terrain generator to use in your world.
// This will allow new/pre-existing worlds to use the custom generator to generate the terrain.
// Once the generator is registered, you can update the `generator` preoprty in the world's configuration to use the custom generator.

export class CustomGenerator extends TerrainGenerator {
  // The identifier of the generator
  public static readonly identifier = "custom_generator";

  // Resolve the block permutations that we are going to use
  public readonly bedrock = BlockPermutation.resolve(BlockIdentifier.Bedrock);
  public readonly stone = BlockPermutation.resolve(BlockIdentifier.Stone);
  public readonly dirt = BlockPermutation.resolve(BlockIdentifier.Dirt);
  public readonly grass = BlockPermutation.resolve(BlockIdentifier.GrassBlock);

  // This method is called when the world generates a chunk
  // For this example we are going to make a superflat world, that has a layer of bedrock, then stone, then dirt, then grass
  public apply(cx: number, cz: number, type: DimensionType): Chunk {
    // Create a new chunk
    const chunk = new Chunk(cx, cz, type);

    // Loop through the x and z axis
    for (let x = 0; x < 16; x++) {
      for (let z = 0; z < 16; z++) {
        // Set the bedrock layer
        chunk.setPermutation(x, 0, z, this.bedrock);

        // Set the stone layer
        chunk.setPermutation(x, 1, z, this.stone);
        chunk.setPermutation(x, 2, z, this.stone);
        chunk.setPermutation(x, 3, z, this.stone);

        // Set the dirt layer
        chunk.setPermutation(x, 4, z, this.dirt);
        chunk.setPermutation(x, 5, z, this.dirt);


        // Set the grass layer
        chunk.setPermutation(x, 6, z, this.grass);
      }
    }

    // Return the chunk
    return chunk;
  }
}

export function onInitialize(serenity: Serenity): void {
  // We need to register the custom generator to the serenity instance.
  // This will allow worlds in the `worlds` directory to use the custom generator.
  serenity.worlds.registerGenerator(CustomGenerator);
}

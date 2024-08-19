import { Block, BlockComponent, Player } from "@serenityjs/world"

// Create a custom block component
class MyCustomBlockComponent extends BlockComponent {
  // The identifier of the block component
  public static readonly identifier = "my_custom_component"

  // The constructor of the block component
  // This binds the component to the block
  public constructor(block: Block) {
    super(block, MyCustomBlockComponent.identifier)
  }

  // This method is called when a player places the block
  public onPlace(player: Player): void {
    player.sendMessage(`You placed a block with the custom component!`)
  }

  // This method is called when a player breaks the block
  public onBreak(player?: Player): void {
    player?.sendMessage(`You broke a block with the custom component!`)
  }

  // This method is called when a player interacts with the block
  public onInteract(player: Player): void {
    player.sendMessage(`You interacted with a block with the custom component!`)
  }

  public onTick(deltaTick: number): void {
    // This method is called every tick
  }

  public onStartBreak(player: Player): void {
    // This method is called when a player starts breaking the block
  }

  public onStopBreak(player: Player): void {
    // This method is called when a player stops breaking the block
  }

  public onUpdate(source?: Block): void {
    // This method is called when the block is updated
  }
}

export { MyCustomBlockComponent }

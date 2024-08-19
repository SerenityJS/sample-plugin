import { Entity, EntityComponent } from "@serenityjs/world";

class HealthBarComponent extends EntityComponent {
  public static readonly identifier = "health_bar";

  public nametag: string | null = null;

  public constructor(entity: Entity) {
    super(entity, HealthBarComponent.identifier);

    // Check if the entity has an existing nametag
    try { this.nametag = entity.getNametag() } catch {}
  }

  public onTick(): void {
    // Get the health component of the entity
    const healthComponent = this.entity.getComponent("minecraft:health");

    // Return if the entity does not have a health component
    if (!healthComponent) return;

    // Get the health of the entity
    const healthCurrent = healthComponent.getCurrentValue();
    const healthMax = healthComponent.effectiveMax;

    // Calculate the health percentage
    const nametag = this.nametag ?
      `${this.nametag}\nHealth: ${healthCurrent}/${healthMax}` :
      `Health: §c${healthCurrent}§r/§c${healthMax}§r`;

    // Set the entity's health bar
    this.entity.setNametag(nametag);
  }
}

export { HealthBarComponent };
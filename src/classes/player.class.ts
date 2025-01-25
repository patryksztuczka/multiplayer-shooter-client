export class Player {
  private name: string;
  private healthPoints: number;
  private size: number;
  private color: string;

  private position: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  private crosshair: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };

  private weaponRange: number = 500;

  constructor(name: string, x: number, y: number, size: number, color: string, hp: number = 100) {
    this.name = name;
    this.position.x = x;
    this.position.y = y;
    this.size = size;
    this.color = color;
    this.healthPoints = hp;
  }

  public getPosition() {
    return this.position;
  }

  public getCenter() {
    return {
      x: this.position.x + this.size / 2,
      y: this.position.y + this.size / 2,
    };
  }

  public getSize() {
    return this.size;
  }

  public getCrosshair() {
    return this.crosshair;
  }

  public getWeaponRange() {
    return this.weaponRange;
  }

  public getColor() {
    return this.color;
  }

  public shoot() {
    console.log("BAM");
  }

  public getName() {
    return this.name;
  }

  public getHealthPoints() {
    return this.healthPoints;
  }

  public gainDamage(damage: number) {
    this.healthPoints -= damage;
  }

  public move(key: string) {
    if (key === "w") {
      this.position.y = this.position.y - 10;
    } else if (key === "s") {
      this.position.y = this.position.y + 10;
    } else if (key === "a") {
      this.position.x = this.position.x - 10;
    } else if (key === "d") {
      this.position.x = this.position.x + 10;
    }
  }

  public moveCrosshair(x: number, y: number) {
    const dx = x - this.getCenter().x;
    const dy = y - this.getCenter().y;
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (distance < 200) {
      this.crosshair.x = x;
      this.crosshair.y = y;
    } else {
      const scale = this.weaponRange / distance;
      this.crosshair.x = this.getCenter().x + scale * dx;
      this.crosshair.y = this.getCenter().y + scale * dy;
    }
  }
}

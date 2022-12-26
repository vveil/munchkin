class Dice {
  private _lastRoll: number = 0;

  get lastRoll(): number {
    return this._lastRoll;
  }

  public rollDice(): number {
    this._lastRoll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return this._lastRoll;
  }
}

enum AttributeType {
  Head,
  Chest,
  Leg,
  Foot,
  None,
}

class Attribute {
  private _bonusÁmount: number;
  private _type: AttributeType;

  constructor(amount: number = 0, type: AttributeType = AttributeType.None) {
    this._bonusÁmount = amount;
    this._type = type;
  }

  get amount(): number {
    return this._bonusÁmount;
  }

  set amount(amount: number) {
    this._bonusÁmount = amount;
  }

  get type(): AttributeType {
    return this._type;
  }

  set type(type: AttributeType) {
    this._type = type;
  }
}

class Card {
  private _name: string;
  private _effect: string;

  constructor(name: string, effect: string) {
    this._name = name;
    this._effect = effect;
  }

  get name(): string {
    return this._name;
  }
}

class Monster extends Card {
  private _badstuff: string;
  private _schaetze: number;

  constructor(
    name: string,
    effect: string,
    badstuff: string,
    schaetze: number
  ) {
    super(name, effect);
    this._badstuff = badstuff;
    this._schaetze = schaetze;
  }

  get schaetze(): number {
    return this._schaetze;
  }

  set schaetze(schaetze: number) {
    this._schaetze = schaetze;
  }
}

class Gear extends Card {
  private _amount: number;
  private _attributes: Attribute[];

  constructor(
    name: string,
    effect: string,
    amount: number,
    attributes: Attribute[] = [new Attribute()]
  ) {
    super(name, effect);
    this._amount = amount;
    this._attributes = attributes;
  }

  get attributes(): Attribute[] {
    return this._attributes;
  }
}

class Player {
  private _equippedGear: Gear[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set equippedGear(equippedGear: Gear[]) {
    this._equippedGear = equippedGear;
  }

  get equippedGear(): Gear[] {
    return this._equippedGear;
  }

  public addGear(gear: Gear) {
    this._equippedGear.push(gear);
  }
}

// function parseEnum<T>(enumType: T, str: string): T[keyof T] {
//   return enumType[str] as T[keyof T];
// }

export class Game {
  public start() {
    const dice = new Dice();
    console.log(dice.rollDice());
    const players = [
      new Player("Gertrud"),
      new Player("Hilde"),
      new Player("Eberhart"),
    ];
    for (let i = 0; i < players.length; i++) {
      let attributeType: AttributeType;
      switch (i) {
        case 0:
          attributeType = AttributeType.Head;
          break;
        case 1:
          attributeType = AttributeType.Chest;
          break;
        case 2:
          attributeType = AttributeType.Leg;
          break;
        case 3:
          attributeType = AttributeType.Foot;
          break;
        default:
          attributeType = AttributeType.None;
          break;
      }
      players[i].addGear(
        new Gear("Gear " + i, "Does nothing", 0, [
          new Attribute(i + 100, attributeType),
        ])
      );
    }

    console.log("\n\n");

    for (const player of players) {
      console.log(player.name + " got the following gear:");
      for (const gear of player.equippedGear) {
        console.log(
          "Gear for " +
            AttributeType[gear.attributes[0].type] +
            " called " +
            gear.name
        );
      }
    }
  }
}

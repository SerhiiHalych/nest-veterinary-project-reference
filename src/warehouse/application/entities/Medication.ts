export class Medication {
  private _id: number;
  private _name: string;
  private _unit: string;
  private _lastPrice: number;

  constructor(params: {
    id: number;
    name: string;
    unit: string;
    lastPrice: number;
  }) {
    const { id, name, unit, lastPrice } = params;

    this._id = id;
    this._name = name;
    this._unit = unit;
    this._lastPrice = lastPrice;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get unit(): string {
    return this._unit;
  }

  public get lastPrice(): number {
    return this._lastPrice;
  }
}

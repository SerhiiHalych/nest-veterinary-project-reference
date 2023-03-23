export class AppointmentType {
  private _id: number;
  private _name: string;
  private _price: number;
  private _secondaryCost: number;
  private _isActive: boolean;

  constructor(params: {
    id: number;
    name: string;
    price: number;
    secondaryCost: number;
    isActive: boolean;
  }) {
    const { id, name, price, secondaryCost, isActive } = params;

    this._id = id;
    this._name = name;
    this._price = price;
    this._secondaryCost = secondaryCost;
    this._isActive = isActive;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get secondaryCost(): number {
    return this._secondaryCost;
  }

  public get isActive(): boolean {
    return this._isActive;
  }
}

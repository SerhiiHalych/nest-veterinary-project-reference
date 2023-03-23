export class Procedure {
  private _id: number;
  private _name: string;
  private _price: number;

  constructor(params: { id: number; name: string; price: number }) {
    const { id, name, price } = params;

    this._id = id;
    this._name = name;
    this._price = price;
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
}

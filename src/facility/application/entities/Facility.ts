export class Facility {
  private _id: number;
  private _address: string;
  private _primaryPhoneNumber: string | null;
  private _secondaryPhoneNumber: string | null;
  private _number: number;

  constructor(params: {
    id: number;
    address: string;
    primaryPhoneNumber: string | null;
    secondaryPhoneNumber: string | null;
    number: number;
  }) {
    const { id, address, number, primaryPhoneNumber, secondaryPhoneNumber } =
      params;

    this._id = id;
    this._address = address;
    this._primaryPhoneNumber = primaryPhoneNumber;
    this._secondaryPhoneNumber = secondaryPhoneNumber;
    this._number = number;
  }

  public get id(): number {
    return this._id;
  }

  public get address(): string {
    return this._address;
  }

  public get primaryPhoneNumber(): string | null {
    return this._primaryPhoneNumber;
  }

  public get secondaryPhoneNumber(): string | null {
    return this._secondaryPhoneNumber;
  }

  public get number(): number {
    return this._number;
  }
}

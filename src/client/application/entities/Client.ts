export class Client {
  private _id: number;
  private _firstName: string | null;
  private _lastName: string | null;
  private _patronymic: string | null;
  private _address: string | null;
  private _phoneNumber: string | null;

  constructor(params: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    patronymic: string | null;
    address: string | null;
    phoneNumber: string | null;
  }) {
    const { id, firstName, lastName, patronymic, address, phoneNumber } =
      params;

    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._patronymic = patronymic;
    this._address = address;
    this._phoneNumber = phoneNumber;
  }

  public get id(): number {
    return this._id;
  }

  public get firstName(): string | null {
    return this._firstName;
  }

  public get lastName(): string | null {
    return this._lastName;
  }

  public get patronymic(): string | null {
    return this._patronymic;
  }

  public get address(): string | null {
    return this._address;
  }

  public get phoneNumber(): string | null {
    return this._phoneNumber;
  }
}

import { PetGender } from '../enums/PetGender';
import { PetSpecies } from '../enums/PetSpecies';

export class Pet {
  private _id: number;
  private _clientId: number;
  private _name: string;
  private _species: PetSpecies;
  private _breed: string;
  private _gender: PetGender;
  private _isBiosterilized: boolean;
  private _dob: Date;

  constructor(params: {
    id: number;
    clientId: number;
    name: string;
    species: PetSpecies;
    breed: string;
    gender: PetGender;
    isBiosterilized: boolean;
    dob: Date;
  }) {
    const { id, clientId, name, species, breed, gender, isBiosterilized, dob } =
      params;

    this._id = id;
    this._clientId = clientId;
    this._name = name;
    this._species = species;
    this._breed = breed;
    this._gender = gender;
    this._isBiosterilized = isBiosterilized;
    this._dob = dob;
  }

  public get id(): number {
    return this._id;
  }

  public get clientId(): number {
    return this._clientId;
  }

  public get name(): string {
    return this._name;
  }

  public get species(): PetSpecies {
    return this._species;
  }

  public get breed(): string {
    return this._breed;
  }

  public get gender(): PetGender {
    return this._gender;
  }

  public get isBiosterilized(): boolean {
    return this._isBiosterilized;
  }

  public get dob(): Date {
    return this._dob;
  }
}

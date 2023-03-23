import { Pet } from '../../application/entities/Pet';
import { PetGender } from '../../application/enums/PetGender';
import { PetSpecies } from '../../application/enums/PetSpecies';
import { PetEntity } from './PetEntity';
import { SaveablePetEntity } from './SaveablePetEntity';

export class PetMapper {
  static toDto(from: PetEntity): Pet {
    const { breed, clientId, dob, gender, id, isBiosterilized, name, species } =
      from;

    return new Pet({
      breed,
      clientId,
      dob,
      gender: gender === 'He' ? PetGender.MALE : PetGender.FEMALE,
      id,
      isBiosterilized: isBiosterilized === 1,
      name,
      species: species === 'Кот' ? PetSpecies.CAT : PetSpecies.DOG,
    });
  }

  static toEntity(from: Pet): SaveablePetEntity {
    const { breed, clientId, dob, gender, id, isBiosterilized, name, species } =
      from;

    return {
      breed,
      clientId,
      dob,
      gender: gender === PetGender.MALE ? 'He' : 'She',
      id,
      isBiosterilized: isBiosterilized ? 1 : 0,
      name,
      species: species === PetSpecies.CAT ? 'Кот' : 'Собака',
    };
  }
}

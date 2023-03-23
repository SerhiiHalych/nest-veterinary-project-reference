import { Facility } from '../../application/entities/Facility';
import { FacilityEntity } from './FacilityEntity';

export class FacilityMapper {
  static toDto(from: FacilityEntity): Facility {
    const { address, id, number, primaryPhoneNumber, secondaryPhoneNumber } =
      from;

    return new Facility({
      address,
      id,
      number,
      primaryPhoneNumber,
      secondaryPhoneNumber,
    });
  }

  static toEntity(from: Facility): FacilityEntity {
    const { address, id, number, primaryPhoneNumber, secondaryPhoneNumber } =
      from;

    return {
      address,
      id,
      number,
      primaryPhoneNumber,
      secondaryPhoneNumber,
    };
  }
}
